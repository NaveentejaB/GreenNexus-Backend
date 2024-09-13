const express = require("express");
const CommentsController = require("../controllers/comments-controllers")


const commentsRouter = express.Router();
const commentController = new CommentsController();

commentsRouter.post('/',(req,res)=>commentController.addNewComment(req,res));
commentsRouter.get('/',(req,res)=>commentController.getAllCommentsOnPost(req,res));
commentsRouter.post('/update',(req,res)=>commentController.updateComment(req,res));
commentsRouter.post('/delete',(req,res)=>commentController.deleteComment(req,res));

module.exports = commentsRouter;