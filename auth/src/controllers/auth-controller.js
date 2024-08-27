const AuthService = require("../services/auth-services");
const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

class UserController {
    constructor(){
        this.AuthService =  new AuthService(); 
    }
    async login(req,res){
        try {
            const {user_email,user_password} = req.body;
            const exisitingUser = await axios.post('http://localhost:3001/userByEmail',{
                user_email : user_email,
            })
            
            if(exisitingUser.data.error){
                console.log(exisitingUser.data.message);
                res.status(400).json({
                    error : true,
                    message : 'user not found'
                })
            }
            const user = exisitingUser.data.user;
            const verifiedPassword = await bcrypt.compare(
                user_password,
                user.user_password
            )
            if(!verifiedPassword){
                res.status(400).json({
                    error : true,
                    message : `invalid login credientials.`
                })
            }
            const payload = { id:user.user_id ,email:user.user_email}

            const accessToken = jwt.sign(
                payload,
                process.env.ACCESS_TOKEN_PRIVATE_KEY,
                { expiresIn: "10080m" }
            )	
            res.status(200).json({
                error : true,
                data : accessToken,
                message : `login success.`
            })
        } catch (error) {
            console.log(error.message);
            res.status(400).json({
                error : true,
                message : `login failed.`
            })
        }
    }
    async sendOTP(req,res){

    }
    async verifyOTP(req,res){
        try{
            const data = req.body;
            let result = undefined;
            if(data.user_email){
                result = await this.AuthService.findEmailDoc(data.user_email,data.otp);
            }else{
                result = await this.AuthService.findPhoneDoc(data.user_phone,data.otp);
            }
            if(!result){
                res.status(400).json({
                    error : true,
                    message : `invalid OTP.`
                })
            }
            res.status(200).json({
                error : false,
                message : 'OTP verified successfully.'
            })
        }catch (error) {
            console.log(error.message);
            res.status(400).json({
                error : true,
                message : `login failed.`
            })
        }
    }
   
    
}

module.exports = UserController