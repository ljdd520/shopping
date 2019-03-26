const mongoose = require('mongoose');
const mongo_user = require('../config/db_mongoose');
const Schema = mongoose.Schema;
// const ObjectId = Schema.Types.ObjectId;

const ProfileSchema = new Schema({
    //用户头像
    userHead:{type:String,required:false},
    //用户名必须唯一
    userName: { type: String, unique: true,required:true },
    //用户的性别
    gender: { type: Number,required: false},
    //用户的中文名
    chinaName: { type: String, required: false },
    //用户的地址
    detailAddress: { type: String, required: false },
    //用户的自我描述
    description: {type: String, required: false},
    //子表关联主表
    userId:{type:Schema.Types.ObjectId,ref:'users' },
    //用户的总分数
    total:{type:Number,required:false},
});


const CollectionName = 'profiles';
const ProfileModel = mongo_user.model(CollectionName, ProfileSchema);
module.exports = ProfileModel;