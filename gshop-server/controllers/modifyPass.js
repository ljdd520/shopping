const UserModel = require('../models/userModel');
const Jcommon = require('../tools/Jcommon');

const modifyPass=async function (req,res) {
    const respondData={
        status:200,
        data:{},
        error:'',
        msg:''
    };
    // 检查必传字段是否传过来
    const is_available = Jcommon.check_key_words(["oldPass","newPass","confirmPass","id"], req, res, 'POST');
    if(is_available===false)return;
    //用户信息的id
    const id=req.body.id;
    const oldPass=req.body.oldPass;
    const newPass=req.body.newPass;
    const confirmPass=req.body.confirmPass;

    //检测用户原密码
    if(oldPass.length<6||oldPass.length>20){
        respondData.status=10020;
        respondData.error="密码长度为6-20位！";
        return res.json(respondData);
    }
    //检测两个新密码
    if(newPass!==confirmPass){
        respondData.status=10021;
        respondData.error="两次密码不同！";
        return res.json(respondData);
    }
    try {
        //根据用户id检测原密码
        const user=await checkPass(id);
        if(!user){
            respondData.status=10016;
            respondData.error="用户为空或者不存在！";
            return res.json(respondData);
        }
        if(user.userpwd!==oldPass){
            respondData.status=10022;
            respondData.error="原密码不正确，请重新输入！";
            return res.json(respondData);
        }
        const data=await changePass(newPass,id);
        if(!data){
            respondData.status=10016;
            respondData.error="密码更新失败！";
            return res.json(respondData);
        }
        respondData.msg="密码更新成功！";
        respondData.data=data;
        return res.json(respondData);
    }catch (e) {
        respondData.error=error;
        respondData.status=10013;
        return res.json(respondData);
    }
};

const changePass=async function (newPass,id) {
    return new Promise(function (resolve,reject) {
        UserModel.update({_id:id},{$set:{userpwd:newPass}},function (err,data) {
            if(err){
                return reject(err);
            }
            return resolve(data);
        })
    });
};

const checkPass=async function(id){
    return new Promise(function (resolve,reject) {
        UserModel.findOne({_id:id},function (err,data) {
           if(err){
               return reject(err);
           }
           return resolve(data);
        });
    });
};

exports.modifyPass= modifyPass;