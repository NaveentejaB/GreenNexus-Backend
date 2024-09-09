const PostTags = require("../models/post_tags")

class PostTagsRespository{
    
    async CreatePostTags(post_tags_data){
        const postTag = await PostTags.create(post_tags_data);
        return postTag;
    }
    async getTagsOfPosts(post_id){
        const postTags = await PostTags.findAll({
            where : {post_id}
        });
        return postTags;
    }
    async deletePostTag(post_id){
        const deletePostTags = await PostTags.destroy({
            where : {post_id}
        })
        return deletePostTags;
    }
}

module.exports = PostTagsRespository