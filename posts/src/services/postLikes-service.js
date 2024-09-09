const PostLikesRespository = require("../repositories/post-likes-repository")
const PostRespository = require("../repositories/post-repository")


class PostLikesService{
    constructor(){
        this.PostLikesRespository = new PostLikesRespository();
        this.PostRespository = new PostRespository();
    }

    async addPostLike(data){
        const postLike  = await this.PostLikesRespository.CreatePostLike(data);
        const incrementPostLike = await this.PostRespository.updatePostsLike(data.post_id);
        return postLike;
    }

    async deletePostLike(data){
        const deletePostLike = await this.PostLikesRespository.DeletePostLike(data.user_id,data.post_id);
        return deletePostLike;
    }

}

module.exports = PostLikesService