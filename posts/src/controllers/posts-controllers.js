const PostsService = require("../services/posts-services")

class PostsController{
    constructor(){
        this.PostsService = new PostsService();
    }
    
    async addNewPost(req,res){
        const data = req.body;
        const post = await this.PostsService.addPost(data);
        res.status(200).json({
            message: 'new post added successfully.',
            data : post,
            error : false
        })
    }
    async getPostById(req,res){
        const {post_id} = req.params;
        const post = await this.PostsService.getSpecificPost(post_id);
        res.status(201).json({
            message: 'post fetched successfully.',
            data : post,
            error : false
        })
    }
    async getAllPostsOfUser(req,res){
        const id = "";
        const posts = await this.PostsService.getAllPostsOfUser(id);
        res.status(200).json({
            message: 'posts fetched successfully.',
            data : posts,
            error : false
        })
    }
    async deletePostById(req,res){
        const {post_id} = req.body;
        const posts = await this.PostsService.deleteSpecificPost(post_id);
        res.status(200).json({
            message: 'post deleted successfully.',
            data : posts,
            error : false
        })
    }
    
}

module.exports = PostsController