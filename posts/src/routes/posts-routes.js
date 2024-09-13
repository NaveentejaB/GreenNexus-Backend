const express = require("express");
const PostsController = require("../controllers/posts-controllers")


const postsRouter = express.Router();
const postsController = new PostsController();

postsRouter.post('/',(req,res)=>postsController.addNewPost(req,res));
postsRouter.post('/delete',(req,res)=>postsController.deletePostById(req,res));
postsRouter.get('/',(req,res)=>postsController.getAllPostsOfUser(req,res));
postsRouter.get('/:post_id',(req,res)=>postsController.getPostById(req,res));

module.exports = postsRouter;