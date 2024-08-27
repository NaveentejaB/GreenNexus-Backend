const express = require('express');
const UserController = require("../controllers/user-controllers");


const router = express.Router();
const userController = new UserController();




module.exports = router;