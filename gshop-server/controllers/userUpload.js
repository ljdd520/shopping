const formidable=require('formidable');
const fs=require('fs');
const ProfileModel = require('../models/profile');
const path=require('path');

const userUpload=async function (req,res,next) {
    //创建上传的表单
    const form=new formidable.IncomingForm();
    //文件保存的临时目录
    form.uploadDir=path.join(__dirname,'tmp');
    //设置编辑
    form.encoding='utf-8';
    //用户的头像大小限制为最大2M
    form.maxFieldsSize=2*1024*1024;
    //使用原来的文件扩展名
    form.keepExtensions=true;
    form.parse(req,function (err,fields,file) {
        let id=fields.id
        let filePath = '';
        //上传的文件名
        if(file.file){
            filePath=file.file.path;
        }else {
            for(const key in file){
                if(file[key].path&&filePath===''){
                    filePath=file[key].path;
                    break;
                }
            }
        }
        //文件移动的目录文件夹,不存在时创建目标文件夹
        const targetDir = path.join(__dirname, 'upload');
        if(!fs.existsSync(targetDir)){
            fs.mkdir(targetDir);
        }
        const fileExt=filePath.substring(filePath.lastIndexOf('.'));
        //判断文件是否允许上传
        if(('.jpg.jpeg.png.gif').indexOf(fileExt.toLowerCase())===-1){
            const err=new Error('此类文件类型不允许上传');
            fs.unlink(filePath,function (err) {
                if (err)throw err;
                console.log('文件删除成功');
            });
            return res.json({code:-1,message:'此类文件类型不允许上传'});
        }else {
            //以当前时间戳对上传文件进行重命名
            const fileName=new Date().getTime()+fileExt;
            const targetFile=path.join(targetDir,fileName);
            fs.rename(filePath,targetFile,function (err) {
                if(err){
                    console.info(err);
                    res.json({code:-1,message:'操作失败'});
                }else {
                    //上传成功,返回文件的相对路径
                    const fileUrl='/upload/'+fileName;
                    //保存用户头像到数据库中
                    const result=updateHeader(id,fileUrl);
                    if(!result){
                        return res.json({code:-1,message:'操作失败'})
                    }
                    res.json({code:0,fileUrl:fileUrl});
                }
            })
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