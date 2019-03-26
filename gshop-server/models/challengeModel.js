const mongoose = require('mongoose');
const mongo_user = require('../config/db_mongoose');
const Schema = mongoose.Schema;


//用户的题目挑战
const ChallengeSchema=new Schema({
    //题目类型，web，pwn，re......
    type:{type:String,required:true},
    //题目名称
    name:{type:String,required:true},
    //题目描述
    describe:{type:String},
    //题目分值
    score:{type:Number,required:true},
    //题目地址
    address:{type:String,required:true},
    //题目的flag
    flag:{type:String},
});

const CollectionChallenge='challenges';
const ChallengeModel=mongo_user.model(CollectionChallenge,ChallengeSchema);
module.exports=ChallengeModel;