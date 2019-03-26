const mongoose = require('mongoose');
const mongo_user = require('../config/db_mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


const UserSchema = new Schema({
  useremail: { type: String, required: true },                      //用户邮箱
  username: { type: String, required: true },
  userpwd: { type: String, required: false },
  status: { type: Number, required: true },
  create_time: {type: Date, required: true},
    //关联profile表
    // profile:{type:ObjectId,ref:'profiles'}
});


const CollectionName = 'users';
const UserModel = mongo_user.model(CollectionName, UserSchema);
module.exports = UserModel;