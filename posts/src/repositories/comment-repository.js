const Comment = require("../models/comments-model")

class CommentRespository{
    async addComment(comment_data){
        const comment = await Comment.create(comment_data);
        return comment;
    }
    async deleteComment(comment_id){
        const comment = await Comment.findByPk(comment_id);
        await comment.destroy();
        return comment;
    }

    async getCommentsByPostId(post_id){
        const comments = await Comment.findAll({
            where : {post_id}
        });
        return comments;
    }

    async updateCommentById(comment_id,content){
        const updatedComment = await Comment.update({content},{
            where : {comment_id}
        });
        return updatedComment;
    }
    
    // not much required for intial phase
    async getCommentsByUserId(user_id){
        const comments = await Comment.findAll({
            where : { user_id }
        })
        return comments;
    }
}

module.exports = CommentRespository