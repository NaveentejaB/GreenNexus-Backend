const CommentService = require("../services/comments-service")

class CommentsController{
    constructor(){
        this.CommentService = new CommentService();
    }
    async addNewComment(req,res){
        const data = req.body;
        const comment = await this.CommentService.addComment(data);
        res.status(200).json({
            message: 'new comment added successfully.',
            error : false
        })
    }

    async getAllCommentsOnPost(req,res){
        const {post_id} = req.body;
        const comments = await this.CommentService.fetchAllCommentOnPost(post_id);
        res.status(200).json({
            message: 'comments fetched successfully.',
            data : comments,
            error : false
        })
    }

    async deleteComment(req,res){
        const {comment_id} = req.body;
        const comment = await this.CommentService.deleteCommentById(comment_id);
        res.status(200).json({
            message: 'comment deleted successfully.',
            error : false
        })
    }

    async updateComment(req,res){
        const data = req.body;
        const comment = await this.CommentService.updateComment(data);
        res.status(200).json({
            message: 'comment updated successfully.',
            error : false
        })
    }
}

module.exports = CommentsController