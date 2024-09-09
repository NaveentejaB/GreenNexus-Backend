const PostLikes = require("../models/post-likes-model")

class PostLikesRespository{
    
    async CreatePostLike(post_like_data){
        const postLikes = await PostLikes.findOrCreate(post_like_data);
        return postLikes;
    }

    async DeletePostLike(user_id,post_id){
        const deletePostLikeData = await PostLikes.findOne({
            where : {post_id,user_id}
        });
        await deletePostLikeData.destroy();
        return deletePostLikeData;
    }
}

module.exports = PostLikesRespository