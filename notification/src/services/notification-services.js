const UserRepository = require("../repositories/notification-repositories")

class UserService {
    constructor(){
        this.UserRepository = new UserRepository()       
    }
    
}

module.exports =  UserService