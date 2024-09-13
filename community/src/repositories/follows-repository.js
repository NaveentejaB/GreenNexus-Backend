const Follows = require('../models/follows-model')



class FollowsRepository{

    async createFollowsRow(follows_data){
        const follow = await Follows.create(follows_data);
        return follow;
    }

    async getAllFollowersOfFollowee(followee_id){
        const followers = await Follows.findAll({
            where : {followee_id, isAccepted : true }
        })
        return followers;
    }

    async acceptFollowRequest(follower_id,followee_id){
        const followReq = await Follows.update({isAccepted : true},{
            where: {followee_id,follower_id}
        });
        return followReq;
    }

    async updateAccountType(followee_id,isPrivate){
        const updatedRow = await Follows.update({
            isPrivate : !isPrivate
        },{
            where : {followee_id}
        });
        
        return updatedRow;
    }
    async removeFollower(follower_id,followee_id){
        const removedFollower = await Follows.destroy({
            where : {followee_id,follower_id}
        })
        return removedFollower;
    }
}

module.exports = FollowsRepository