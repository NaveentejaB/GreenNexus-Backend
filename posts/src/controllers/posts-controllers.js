const PostsService = require("../services/posts-services")

class PostsController{
    constructor(){
        this.PostsService = new PostsService();
    }
    async addNewPost(data){
        try{

        }catch(err){
            
        }
    }
}

module.exports = PostsController