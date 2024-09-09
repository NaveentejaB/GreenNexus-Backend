const Post = require('../models/posts-model')

class PostRespository{

    async CreatePost(data){
        const Post = await Post.create(data);
        return Post;
    }
    
    async DeletePost(post_id){
        const deletePost = await Post.findByPk(post_id);
        await deletePost.destroy();
        return deletePost;
    }
    async getPost(post_id){
        const post = await Post.findByPk(post_id);
        return post;
    }
    async getAllPostsbyUserId(user_id){
        const posts = await Post.findAll({user_id:user_id});
        return posts;
    }

    async updatePostsLike(post_id){
        const post = await Post.increment('total_likes',{
            by : 1,
            where : {post_id : post_id}
        })
        return post;
    }
}

module.exports = PostRespository