const express = require('express');
const UserController = require("../controllers/auth-controller");


const router = express.Router();
const userController = new UserController();




module.exports = router;