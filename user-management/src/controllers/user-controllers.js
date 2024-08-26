const UserService = require("../services/user-services")

class UserController {
    constructor(){
        this.service =  new UserService(); 
    }

    async registerUser(req,res) {
        try {
            // user = {user_name,user_phone,user_age,user_location,user_email}
            const user = req.body;
            console.log(user); 
            const existingUser = await this.service.findUserByEmailAndPhone(user.user_email,user.user_phone);
            console.log("existingUser:",existingUser);
            
            if(existingUser){
                console.log("user already exist");
                throw new Error("user already exist");   
            }
            const result = await this.service.createUser(user);
            res.status(201).json({
                error : false,
                user : result,
                message : `user created succesfully.`
            })
        } catch (error) {
            console.log(error.message);
            
            res.status(400).json({
                error : true,
                message : `user not created.`
            })
        }

    }
    async getAllUser(req,res){
        try {
            const users = await this.service.getAllUsers();
            res.status(200).json({
                error : false,
                message : `users fetched.`,
                data : users
            })
        } catch (error) {
            console.log(error);
            
            res.status(400).json({
                error : true,
                message : error
            })
        }
    }
    async getSpecificUserById(req,res){
        try {
            const id = '998043078596067329'
            const user = await this.service.getUserById(id);
            res.status(200).json({
                error : false,
                message : `users fetched.`,
                user : user
            })
        } catch (error) {
            console.log(error);
            
            res.status(400).json({
                error : true,
                message : error
            })
        }
    }
}

module.exports = UserController