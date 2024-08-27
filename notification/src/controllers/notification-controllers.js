const UserService = require("../services/notification-services")
const bcrypt = require('bcrypt')

class UserController {
    constructor(){
        this.service =  new UserService(); 
    }

    async registerUser(req,res) {
        try {
            // user = {user_name,user_phone,user_age,user_location,user_email,user_password}
            const user = req.body;
            const existingUser = await this.service.findUserByEmailAndPhone(user.user_email,user.user_phone);

            if(existingUser){
                console.log("user already exist");
                throw new Error("user already exist");   
            }
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(user.user_password, salt);
            user.user_password = hashPassword;

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
    async getUserByEmail(req,res){
        try {
            const {user_email} = req.body;
            console.log("ser");
            
            const existingUser = await this.service.findUserByEmail(user_email);
            if(!existingUser){
                res.status(400).json({
                    error : true,
                    message : `user not found`
                })
            }
            res.status(200).json({
                error : false,
                user : existingUser,
                message :`user details fetched.`
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