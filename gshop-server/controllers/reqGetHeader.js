const ProfileModel = require('../models/profile');
const Jcommon = require('../tools/Jcommon');

const reqGetHeader=async function (req,res) {
    const respondData={
        status:200,
        data:{},
        error:'',
        msg:'',
    };
    // 检查必传字段是否传过来
    const is_available = Jcommon.check_key_words(["id"], req, res, 'GET');
    if(is_available===false)return;
    //用户信息的id
    const id=req.query.id;
    try {
        const profile=await findProfile(id);
        if(!profile){
            respondData.status=10016;
            respondData.error="用户为空或者不存在！";
            return res.json(respondData);
        }
        respondData.msg="获取用户成功";
        respondData.data=profile;
        return res.json(respondData);
    }catch (error) {
        respondData.error=error;
        respondData.status=10013;
        return res.json(respondData);
    }
};

const findProfile=async function (id) {
    return new Promise(function (resolve,reject) {
        ProfileModel.findOne({userId:id},function (err,data) {
            if(err){
                return reject(err);
            }
            return resolve(data);
        })
    });
};

exports.reqGetHeader= reqGetHeader;