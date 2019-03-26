const ChallengeModel = require('../models/challengeModel');


const userChallenge=async function (req,res,next) {
    const responseData={
        status:200,
        data:{},
        error:'',
        msg:''
    };
    try {
        //查询数据库
        ChallengeModel.find({},function (err,challenge) {
            if(!challenge){
                //题目不存在
                responseData.status=10009;
                responseData.error="题目不存在";
                return res.json(responseData);
            }else {
                responseData.data=challenge;
                responseData.msg="获取题目成功";
                return res.json(responseData);
            }
        })
    }catch (error) {
        //错误处理
        responseData.error=error;
        return res.json(responseData);
    }
};

exports.userChallenge=userChallenge;