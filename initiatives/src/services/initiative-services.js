const UserRepository = require("../repositories/initiative-repository")

class UserService {
    constructor(){
        this.UserRepository = new UserRepository()       
    }

}

module.exports =  UserService