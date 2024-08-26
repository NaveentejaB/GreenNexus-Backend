const User = require("../models/user-model")
const { Op } = require('sequelize');


class UserRepository {
    async createUser(user_data) {
        const createdUser = await User.create(user_data);
        return createdUser;
    }
    async findById (userId) {
        const user = await User.findByPk(userId, { raw: true });
        return user;
    }

    async findAll() {
        const users = await User.findAll()
        return users;
    }

    async findUserExists(user_email,user_phone){
        const user = await User.findOne({
            where : {
                [Op.and]: [{ user_email: user_email }, { user_phone: user_phone }],
            },
        })
        return user;
    }
}

module.exports = UserRepository