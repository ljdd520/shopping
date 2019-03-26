const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userControllers');
const userUpload=require('../controllers/userUpload');
// const userUpload=require('../controllers/upload_file');
const userChallenge=require('../controllers/userChallenge');
const reqCheckFlag=require('../controllers/reqCheckFlag');
const formEcho=require('../controllers/formEcho');
const modifyPass=require('../controllers/modifyPass');
const reqSaveProfile=require('../controllers/reqSaveProfile');
const reqGetHeader=require('../controllers/reqGetHeader');
/* GET users listing. */
//user_regist
router.post('/user_regist', userCtrl.user_regist);

//user_activation
router.get('/user_activation', userCtrl.user_activation);

//user_login
router.post('/user_login', userCtrl.user_login);

//user_logout
router.get('/user_logout',userCtrl.user_logout);

//userUpload
router.post('/userUpload',userUpload.userUpload);

//userinfo
router.get('/userinfo',userCtrl.reqUserInfo);

//userChallenge
router.get('/challenge',userChallenge.userChallenge);

//reqCheckFlag
router.post('/checkFlag',reqCheckFlag.reqCheckFlag);

//formEcho
router.get('/formEcho',formEcho.formEcho);

router.post('/modifyPass',modifyPass.modifyPass);

//保存个人信息
router.post('/saveProfile',reqSaveProfile.reqSaveProfile);

//获取头像
router.get('/reqGetHeader',reqGetHeader.reqGetHeader);

module.exports = router;
