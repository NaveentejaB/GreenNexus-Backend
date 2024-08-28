const UserService = require("../services/initiative-services")
const bcrypt = require('bcrypt')

class UserController {
    constructor(){
        this.service =  new UserService(); 
    }

}

module.exports = UserController