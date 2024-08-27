const express = require('express');
const AuthController = require("../controllers/auth-controller");


const router = express.Router();
const authController = new AuthController();

router.post('/login',(req,res)=>authController.login(req,res));
router.post('/verify',(req,res)=>authController.verifyOTP(req,res));


module.exports = router;