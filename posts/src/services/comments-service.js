const CommentRespository = require("../repositories/comment-repository")

class CommentService{
    constructor(){
        this.CommentRespository = new CommentRespository();
    }

    async addComment(data){
        const comment  = await this.CommentRespository.addComment(data);
        return comment;
    }

    async deleteComment(comment_id){
        const deletedcomment = await this.CommentRespository.deleteComment(comment_id);
        return deletedcomment;
    }

    async fetchAllCommentOnPost(post_id){
        const comments = await this.CommentRespository.getCommentsByPostId(post_id);
        return comments;
    }

    async updateComment(data){
        const updatedComment = await this.CommentRespository.updateCommentById(data.comment_id,data.content);
        return updatedComment;
    }
}

module.exports = CommentService