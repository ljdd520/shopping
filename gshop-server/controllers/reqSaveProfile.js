const ProfileModel = require('../models/profile');
const Jverify = require('../tools/Jverify');
const Jcommon = require('../tools/Jcommon');
//保存用户信息
const reqSaveProfile=async function (req,res) {
    const respondData={
        status:200,
        data:{},
        error:'',
        msg:''
    };
    // 检查必传字段是否传过来
    const is_available = Jcommon.check_key_words(["userName", "radio", "chinaName","detailAddress","description","id"], req, res, 'POST');
    if(is_available===false)return;
    const userName=req.body.userName;
    const radio=req.body.radio;
    const chinaName=req.body.chinaName;
    const detailAddress=req.body.detailAddress;
    const description=req.body.description;
    const id=req.body.id;

    //验证用户名
    const is_userName=Jverify.verify_userName(userName);
    if(is_userName===false){
        respondData.status=10013;
        respondData.error="用户名格式不正确";
        return res.json(respondData);
    }

    //验证中文名
    const is_chinaName=Jverify.verify_chinaName(chinaName);
    if(is_chinaName===false){
        respondData.status=10014;
        respondData.error="中文名格式不正确";
        return res.json(respondData);
    }
    const profileData={
        userHead:'',
        userName:userName,
        gender:radio,
        chinaName:chinaName,
        detailAddress:detailAddress,
        description:description,
        userId:id,
    };
    try {
        const profile=await saveProfile(id,profileData);
        if(!profile){
            respondData.status=10014;
            respondData.error="用户信息更新失败！";
            return res.json(respondData);
        }
        console.log("用户信息更新成功！");
        respondData.msg="保存成功";
        respondData.data=profile;
        return res.json(respondData);
    }catch (error) {
        respondData.error=error;
        respondData.status=10013;
        return res.json(respondData);
    }
};


//查看用户是否存在

const saveProfile=async function(id,findData){
    return new Promise(function (resolve,reject) {
        ProfileModel.find({'userId':id},function (err,data) {
            if(err){
                return reject(err);
            }
            if(data){
                ProfileModel.update({'userId':id}, {$set:{userName: findData.userName, gender: findData.gender,chinaName: findData.chinaName,detailAddress: findData.detailAddress,description: findData.description}}, function (err,data) {
                    if(err){
                        return reject(err);
                    }
                    return resolve(data);
                })
            }else {
                const profileData=new ProfileModel(findData);
                profileData.save(function (err,data) {
                    if(err){
                        return reject(err);
                    }
                    return resolve(data)
                })
            }
        })
    })
};



exports.reqSaveProfile=reqSaveProfile;