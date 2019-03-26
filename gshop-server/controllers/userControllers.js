const UserModel = require('../models/userModel');
const redis = require('../config/db_redis');
const md5 = require('../tools/Jcrypto').md5;
const Jverify = require('../tools/Jverify');
const Jcommon = require('../tools/Jcommon');
const Jtoken = require('../tools/Jtoken').tokenValidation;
const nodemailer = require('nodemailer');
const _filter = {'pwd': 0, '__v': 0}; // 查询时过滤掉
const config=require('../config/user_token');
const jwt=require('jsonwebtoken');
// const Jwt=require('../tools/jwt');

/**
 * params:  {user_email,user_password,user_name}
 * return:  users
 * describe: user_regist
 **/
const user_regist =async function (req, res) {
	const respondData = {
		status: 200,
		data: {},
		error: '',
		msg: ''
	};
	// 检查必传字段是否传过来
	const is_available = Jcommon.check_key_words(["user_email", "user_password", "user_name"], req, res, 'POST');
	if (is_available === false) return; // 如果字段不合格，直接返回
	const user_email = req.body.user_email;
	const user_password = req.body.user_password;
	const user_name = req.body.user_name;

	// 验证邮箱是否正确
	const is_email = Jverify.verify_email(user_email);
	if (is_email === false) {
		respondData.status = 10000;
		respondData.error = "邮箱不符合规范";
		return res.json(respondData);
	}

	// 验证密码是否正确
	const is_password_str = Jverify.verify_password(user_password);
	const is_enable_length = (user_password.length > 6 && user_password.length < 20);
	if (!(is_password_str && is_enable_length)) {
		respondData.status = 10001;
		respondData.error = "密码不符合规范";
		return res.json(respondData);
	}
	try {
		const user = await findUserAsyc({ 'useremail': user_email });//验证用户是否已注册
		if (user) {
			respondData.status = 10002;
			respondData.error = "邮箱已注册";
			return res.json(respondData);
		}
		//用户参数
		const userpassword = md5(user_password);
		const userInfo = {
			useremail: user_email,
			username: user_name,
			userpwd: userpassword,
			status: 0,
			create_time: Date.now('YYYY-MM-DD')
		};
		//新建用户
		const newUser = new UserModel(userInfo);
		newUser.save(function (err, data) {
			if (err) {
				console.log("newGuess.save err-->" + JSON.stringify(err));
				respondData.status = "00001";
				respondData.error = "mongodb system error";
				return res.json(respondData);
			}
			console.log("newGuess.save data.json -->" + JSON.stringify(data));
			let userEmail = data.useremail;
			let sendEmail = sendUserEmail(userEmail);
			console.log("sendEmail:" + sendEmail);
			respondData.msg = "新用户注册成功,激活邮箱发送成功";
			return res.json(respondData);
		});
	} catch (error) {
		//错误处理
		respondData.error = error;
		return res.json(respondData);
	}
};

/**
 * params:  {user_email,user_password,user_name}
 * return:  users
 * describe: user_activation
 **/
const user_activation = async function (req, res) {
	const respondData = {
		status: 200,
		data: {},
		error: '',
		msg: ''
	};
	// 检查必传字段是否传过来
	const is_available = Jcommon.check_key_words(["account", "code"], req, res, 'GET');
	if (is_available === false) return; // 如果字段不合格，直接返回
	let user_email = req.query.account;
	let code = req.query.code;
	try {
		let codeVal = await Jtoken(code);
		if (!codeVal) {
			respondData.error = "code失效，请重新发送邮件激活";
			return res.json(respondData);
		}
		let userinfo = JSON.parse(codeVal);
		console.log(userinfo);
		console.log(userinfo.userEmail)
		if (userinfo.userEmail !== user_email) {
			respondData.error = "邮箱不正确";
			return res.json(respondData);
		}
		const user = await findUserAsyc({ 'useremail': user_email });//验证用户是否已注册
		if (user) {
			if (user.status === 0) {
				UserModel.update({ 'useremail': user_email }, { '$set': { status: 1 } }, function (err, results) {
					if (err) {
						console.log("UserModel.update err-->" + JSON.stringify(err));
						respondData.status = "00001";
						respondData.error = "mongodb system error";
						return res.json(respondData);
					}
					respondData.msg = "邮箱激活成功";
					return res.json(respondData);
				})
			} else if (user.status === 1) {
				respondData.msg = "此邮箱已经激活了哦，不要重复激活";
				return res.json(respondData);
			}
		}
	} catch (error) {
		//错误处理
		respondData.error = error;
		return res.json(respondData);
	}
};

/**
 * params:  {user_email,user_password,user_name}
 * return:  users
 * describe: user_login
 **/
const user_login = async function (req, res) {
	const respondData = {
		status: 200,
		data: [],
		error: '',
		msg: '',
		auth:false,
		token:null
	};
	// 检查必传字段是否传过来
	const is_available = Jcommon.check_key_words(["user_email", "user_password"], req, res, 'POST');
	if (is_available === false) return; // 如果字段不合格，直接返回
	const user_email = req.body.user_email;
	const user_password = req.body.user_password;

	// 验证邮箱是否正确
	const is_email = Jverify.verify_email(user_email);
	if (is_email === false) {
		respondData.status = 10000;
		respondData.error = "邮箱不符合规范";
		return res.json(respondData);
	}

	// 验证密码是否正确
	const is_password_str = Jverify.verify_password(user_password);
	const is_enable_length = (user_password.length > 6 && user_password.length < 20);
	if (!(is_password_str && is_enable_length)) {
		respondData.status = 10001;
		respondData.error = "密码不符合规范";
		return res.json(respondData);
	}
	try {
		const user = await findUserAsyc({ 'useremail': user_email });//验证用户是否已注册
		if (!user) {
			respondData.status = 10000;
			respondData.error = "邮箱未注册";
			return res.json(respondData);
		}
		const userverify = await findUserVerify(user_email,user_password);//验证用户
		if(!userverify){
			//未授权的状态码10005
			respondData.status = 10005;
			respondData.error = "邮箱或密码错误";
			return res.json(respondData);
		}
		console.log(userverify);
		if(userverify.status === 0){
			respondData.status = 10006;
			respondData.error = "邮箱未激活，请激活邮箱";
			return res.json(respondData);
		} else if(userverify.status === 1){
			const tokenexpiraton = 1800;
			const token = require('crypto').randomBytes(16).toString('hex');
			const tokenContent = {
				useremail: userverify.useremail,
				username: userverify.username
			};
			redis.set(token, JSON.stringify(tokenContent));
			redis.expire(token, tokenexpiraton);
			const userBackInfo = {};
			userBackInfo.token = token;
			userBackInfo.useremail = userverify.useremail;
			userBackInfo.username = userverify.username;
			userBackInfo._id = userverify._id;
			respondData.data.push(userBackInfo);
			//生成token
			// let jwt=new Jwt(userverify._id);
            // let clent_token=jwt.createToken();
			let clent_token=jwt.sign({id:userverify._id,exp:(Date.now()/1000)+60*60},config.secret);
			respondData.msg = "登陆成功";
			respondData.auth=true;
			respondData.token=clent_token;
			//把用户加入到session中
			req.session.userid=userBackInfo._id;
			return res.json(respondData);
		}	
	} catch (error) {
		//错误处理
		respondData.error = error;
		respondData.status=100000;
		return res.json(respondData);
	}
};

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const user_logout=async function(req,res){
    const responseData={
        status:10007,
        data:{},
        error:'',
        msg:''
    };
    // 清除浏览器保存的userid的cookie
    delete req.session.userid;
    //返回数据
    res.json(responseData)
};

/**
 * params:  {cnd}:user find condition
 * return:  user
 * describe: findUserAsyc
 **/
const findUserAsyc = async function (cnd) {
	return new Promise(function (resolve, reject) {
		UserModel.findOne(cnd, function (error, data) {
			if (error) {
				return reject(error);
			}
			return resolve(data);
		});
	})
};

/**
 * params:  {cnd}:user find condition
 * return:  user
 * describe: findUserVerify
 **/
const findUserVerify = async function (email,password) {
	const userPassword = md5(password);
	return new Promise(function (resolve, reject) {
		UserModel.findOne({'$and':[{useremail:email},{userpwd:userPassword}]}, function (error, data) {
			console.log("controllers/UserController.js/findUserVerify findOne  data.json --> " + JSON.stringify(data));
			if (error) {
				return reject(error);
			}
			return resolve(data);
		});
	})
};

/**
 * params:  {cnd}:user find condition
 * return:  user
 * describe: sendUserEmail
 **/
function sendUserEmail(cnd) {
	console.log("controllers/UserController.js/sendUserEmail start --> " + JSON.stringify(cnd));
	const expiraton = 1800;
	const code = require('crypto').randomBytes(16).toString('hex');
	const codeContent = {
		userEmail: cnd
	};
	redis.set(code, JSON.stringify(codeContent));
	redis.expire(code, expiraton);
    const config_email = {
        host: 'smtp.163.com',
        post: 25, // SMTP 端口
        secureConnection: true, // 使用 SSL
        auth: {
            user: '15284605017@163.com',
            pass: 'ljdd5201314'
        }
    };
    const transporter = nodemailer.createTransport(config_email);

    const html = '<div><a href="http://127.0.0.1:4000/users/user_activation?code=' + code + '&account=' + cnd + ' "></a></div>';
    console.log(html);
    const data = {
        from: '15284605017@163.com', // 发件地址
        to: cnd, // 收件列表
        subject: 'Hello ljdd5201314', // 标题
        //text: html // 标题 //text和html两者只支持一种
        html: html // html 内容
    };
    console.log(data);
	transporter.sendMail(data, function (err, info) {
		if (err) {
			return (err);
		}
		console.log(info.response);
		return (info.response);

	});
}

const reqUserInfo=async function(req,res){
	const userid=req.session.userid;
	//查询数据库
	UserModel.findOne({_id:userid},_filter,function (err,user) {
		if(!user){
			//清除浏览器保存的userid的cookie
			delete req.session.userid;
			res.json({code:1,msg:'请先登陆'});
		}else {
			res.json({code:0,data:user})
		}
    })
};




exports.user_regist = user_regist;
exports.user_activation = user_activation;
exports.user_login = user_login;
exports.user_logout=user_logout;
exports.reqUserInfo=reqUserInfo;