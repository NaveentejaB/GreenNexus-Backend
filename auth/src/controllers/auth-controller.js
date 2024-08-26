const AuthService = require("../services/auth-service")

class UserController {
    constructor(){
        this.AuthService =  new AuthService(); 
    }
    async login(){
        try {
            const {user_email,user_password} = req.body;
        } catch (error) {
            console.log(error.message);
            res.status(400).json({
                error : true,
                message : `login failed.`
            })
        }
    }
    async sendOTP(){

    }
    async verifyOTP(){

    }
   
    
}

module.exports = UserController