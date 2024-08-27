const AuthRepository = require("../repositories/auth-repositories")


class AuthService {
    constructor(){
        this.AuthRepository = new AuthRepository()       
    }
    async findEmailDoc(user_email,otp){
        const doc = await this.AuthRepository.findByEmailAndOTP(user_email,otp);
        return doc;
    }
    async findPhoneDoc(user_phone,otp){
        const doc = await this.AuthRepository.findByPhoneAndOTP(user_phone,otp);
        return doc;
    }
}

module.exports =  AuthService