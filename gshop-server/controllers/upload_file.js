const multer=require('multer');
const fs=require('fs');
const ProfileModel = require('../models/profile');

const userUpload=async function (req,res,next) {
    console.log(req.file);
    //设置文件上传的路径
    const uploadDir='./upload';
    const upload=multer({dest:uploadDir}).single('image');
    upload(req,res,function (err) {
        if(err){
            console.log(err.message);
        }else {
            console.log(req.file.originalname);
            const des_file=uploadDir+req.file.originalname;
            fs.readFile(req.file.path,function (err,data) {
                //将data写入文件中，写一个新的文件
                fs.writeFile(des_file,data,function (err) {
                    let responseData;
                    if(err){
                        console.log(err.message);
                    }else {
                        responseData={
                            message:'File upload successfully',
                            filename: req.file.originalname
                        };
                        //删除临时文件
                        fs.unlink(req.file.path,function (err) {
                            if(err){
                                console.error(err.message);
                            }else {
                                console.log('delete'+req.file.path+'successfully!');
                            }
                        });
                    }
                    res.end(JSON.stringify(responseData))
                });
            });
        }
    })
};


const updateHeader=function (id,fileUrl) {
    return new Promise(function (resolve,reject) {
        ProfileModel.update({'userId':id}, {$set:{userHead:fileUrl}}, function (err,data) {
            if(err){
                return reject(err);
            }
            return resolve(data);
        })
    });
};
exports.userUpload=userUpload;