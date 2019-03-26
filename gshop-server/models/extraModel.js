const mongoose=require('mongoose');
const mongo_user=require('../config/db_mongoose');
const Schema=mongoose.Schema;

const ExtraSchema=new Schema({
    //用户主表
    userId:{type:Schema.Types.ObjectId,ref:'users' },
    //题目ID
    challengeId:{type:Schema.Types.ObjectId,ref:'challenges'},
    //题目名字
    name:{type:String,required: false},
    //题目状态{是否被完成}
    status:{type:Number,required: false,default:0},
    //做出此题的时间
    time:{type: Date, required: true},
    //做出此题的积分
    scores:{type:Number,required: true}
});

const CollectionExtra='extra';
const ExtraModel=mongo_user.model(CollectionExtra,ExtraSchema);
module.exports=ExtraModel;