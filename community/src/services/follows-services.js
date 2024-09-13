const { error } = require("winston");
const axios = require('axios')
const FollowsRepository = require("../repositories/follows-repository")

class FollowsService {
    constructor(){
        this.FollowsRepository = new FollowsRepository()
    }
    
}   

module.exports =  FollowsService