const fs=require('fs');
const path=require('path');
const jst=require('jsonwebtoken');

class Jwt {
    constructor(data){
        this.data=data;
    }
    //生成token
    createToken(){
        let data=this.data;
        let create=Math.floor(Date.now()/1000);
        let cert=fs.readFileSync(path.join(__dirname,'../rsa/rsa_private_key.pem'));
        return jst.sign({
            data,
            exp: create + 60 * 30,
        }, cert, {algorithm: 'RS256'});
    }
    //校检token
    verifyToken(){
        let token=this.data;
        let cert=fs.readFileSync(path.join(__dirname,'../rsa/rsa_public_key.pem'));
        console.log(path.join(__dirname,'../rsa/rsa_public_key.pem'))
        let res;
        try{
            let result=jst.verify(token,cert,{algorithms:['RS256']})||{};
            let {exp=0}=result,current=Math.floor(Date.now()/1000);
            if(current<=exp){
                res=result.data||{};
            }
        }catch (e) {
            res='err';
        }
        return res;
    }
}

module.exports=Jwt;