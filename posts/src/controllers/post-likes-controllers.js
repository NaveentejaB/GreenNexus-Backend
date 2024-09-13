const PostLikesService = require("../services/postLikes-service")

class PostLikesController{
    constructor(){
        this.PostLikesService = new PostLikesService();
    }
    async LikePost(req,res){
        const data = req.body;
        const postLike = await this.PostLikesService.addPostLike(data);
        res.status(200).json({
            message: 'post liked successfully.',
            error : false
        })
    }

    async RemoveLikeForPost(req,res){
        const data = req.body;
        const post = await this.PostLikesService.getSpecificPost(post_id);
        res.status(201).json({
            message: 'post like removed successfully.',
            error : false
        })
    }
}

module.exports = PostLikesController