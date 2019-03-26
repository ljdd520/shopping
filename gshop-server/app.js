const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session=require('express-session');

const index = require('./routes/index');
const users = require('./routes/users');
//const Jwt=require('./tools/jwt');
const jwt=require('jsonwebtoken');
const config=require('./config/user_token');
const formidable=require('formidable');
const multer=require('multer');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//后台的session和cookie
app.use(session({
    secret:'12345',
    cookie:{
        maxAge:24*60*60*1000*7,
        httpOnly: true
    },
    resave:false,
    saveUninitialized:true
}));

// 服务端会对所有需要验证身份信息的请求接口进行拦截并校验token的合法性
// app.use(function (req,res,next) {
//     const respondData = {
//         status: 200,
//         msg: ''
//     };
//    if(req.url!=='/users/user_login'&&req.url!=='/users/register'){
//        let token=req.headers['X-Token'];
//        console.log(token);
//        let jwt=new Jwt(token);
//        let result=jwt.verifyToken();
//        if(result==='err'){
//            console.log(result);
//            respondData.status=403;
//            respondData.msg='登陆已过期，请重新登陆';
//            return res.json(respondData);
//        }else {
//            next();
//        }
//    }else {
//        next()
//    }
// });

// 解决跨域问题
app.all('/users/userUpload',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method === 'OPTIONS') {
        res.send(200); //让options请求快速返回/
    }
    else {
        next();
    }
});

app.use(function (req,res,next) {
    if(req.url!=='/users/user_login'&&req.url!=='/users/register'&&req.url!=='/users/userUpload'){
        let token=req.headers.auth;
        // console.log(req.headers.auth)
        if(token!==null){
            jwt.verify(token,config.secret,function (err,decoded) {
                if(err){
                    return res.json({status:401,msg:'无效的token'});
                }else {
                    req.decoded=decoded;
                    next();
                }
            })
        }else {
            return res.json({status:403,msg:'没有token'});
        }
    }else {
        next()
    }
});

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
