const express = require("express");
const PostLikesController = require("../controllers/post-likes-controllers")


const postLikesRouter = express.Router();
const postLikesController = new PostLikesController();

postLikesRouter.post('/like',(req,res)=>postLikesController.LikePost(req,res));
postLikesRouter.post('/removeLike',(req,res)=>postLikesController.RemoveLikeForPost(req,res));

module.exports = postLikesRouter;