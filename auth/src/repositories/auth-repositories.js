const PhoneOtp = require("../models/email-otp-model")
const EmailOTP = require("../models/phone-otp-mode")
const { Op } = require('sequelize');


class AuthRepository {
    async createEmailOtp(user_email,otp,user_id){
        const createdEmailOTP = await EmailOTP.create({
            user_id : user_id,
            user_email : user_email,
            otp : otp
        })
        return createdEmailOTP;
    }

    async createPhoneOtp(user_phone,otp,user_id){
        const createdPhoneOTP = await PhoneOtp.create({
            user_id : user_id,
            user_phone : user_phone,
            otp : otp
        })
        return createdPhoneOTP;
    }

    async findByEmailAndOTP(user_email,otp){
        const otpDoc = await EmailOTP.findOne({
            where : {
                [Op.and]: [{ user_email: user_email }, { otp: otp }],
            },
        })
        return otpDoc;
    }

    async findByPhoneAndOTP(user_phone,otp){
        const otpDoc = await EmailOTP.findOne({
            where : {
                [Op.and]: [{user_phone}, { otp: otp }],
            },
        })
        return otpDoc;
    }
}

module.exports = AuthRepository