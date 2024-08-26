const AuthRepository = require("../repositories/auth-repository")


class AuthService {
    constructor(){
        this.AuthRepository = new AuthRepository()       
    }
    
}

module.exports =  AuthService