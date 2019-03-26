const ChallengeModel = require('../models/challengeModel');
const ExtraModel=require('../models/extraModel');
const ProfileModel = require('../models/profile');
const Jcommon = require('../tools/Jcommon');

const reqCheckFlag=async function (req,res) {
    const respondData={
        status:200,
        data: {},
        error:'',
        msg:'',
    };
    //检测必传字段是否传过来
    const is_available=Jcommon.check_key_words(["flag","id"],req,res,'POST');
    //如果字段不存在就返回
    if(is_available===false)return;
    //用户提交的flag
    const flag=req.body.flag;
    //用户id
    const id=req.body.id;
    try{
        const challenge=await findChallengeAsyc(flag);
        if(!challenge){
            respondData.status=10010;
            respondData.error="flag不正确！";
            return res.json(respondData);
        }else {
            const findData={
                userHead:'',
                userName:'',
                gender:'',
                chinaName:'',
                detailAddress:'',
                description:'',
                total:challenge.score,
                userId:id
            };
            //更新用户的积分
            const scores=await changeScore(id,challenge.score,findData);
            if(!scores){
                respondData.error='flag提交失败，请重复提交！';
                respondData.status='100010';
                return res.json(respondData);
            }
            //创建中间表
            const extraData={
                userId: id,
                challengeId:challenge._id,
                name:challenge.name,
                status:1,
                time:Date.now('YYYY-MM-DD'),
                scores:scores.total
            };
            const extra=await saveExtra(extraData);
            if(!extra){
                respondData.error='flag提交失败，请重复提交！';
                respondData.status='100010';
                return res.json(respondData);
            }
            respondData.msg="恭喜你答对了！";
            return res.json(respondData);
        }
    }catch (error) {
        //代码执行错误
        respondData.status=10012;
        respondData.error=error;
        return res.json(respondData);
    }
};

/**
 *
 * @param cnd
 * @returns {Promise<*>}
 */
const findChallengeAsyc=async function(cnd){
    return new Promise(function (resolve,reject) {
        ChallengeModel.findOne(cnd,function (error,data) {
            if(error){
                return reject(error);
            }
            return resolve(data);
        })
    });
};

/**
 *
 * @param extraData
 * @returns {Promise<*>}
 */
const saveExtra=async function(extraData){
    return new Promise(function (resolve,reject) {
        ExtraModel.findOne({'challengeId':extraData.challengeId},function (err,data) {
            if(err){
                return reject(err);
            }
            if(data){
                ExtraModel.update({'challengeId':extraData.challengeId},{$set:{userId:extraData.userId,name:extraData.name,status:extraData.status}},function (err,data) {
                    if(err){
                        return reject(err);
                    }
                    return resolve(data);
                })
            }else {
                const extraData=new ExtraModel(extraData);
                extraData.save(function (err,data) {
                    if(err){
                        return reject(err);
                    }
                    return resolve(data);
                })
            }
        })
    })
};

/**
 *
 * @param id
 * @param score
 * @param findData
 * @returns {Promise<*>}
 */
const changeScore=async function(id,score,findData){
    return new Promise(function (resolve,reject) {
        ProfileModel.findOne({'userId':id},function (err,data) {
            if(err){
                return reject(err);
            }
            if(data){
                ProfileModel.update({'userId':id},{$set: {total:data.total+score}},function (err,data) {
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
                    return resolve(data);
                })
            }
        })
    })
};

exports.reqCheckFlag=reqCheckFlag;