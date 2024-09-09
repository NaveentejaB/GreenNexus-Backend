const { error } = require("winston");
const axios = require('axios')
const PostRespository = require("../repositories/post-repository")
const TagsRespository = require("../repositories/tags-repository")
const PostTagsRespository = require("../repositories/post-tags-repository")

class PostsService {
    constructor(){
        this.PostRespository = new PostRespository();
        this.TagsRespository = new TagsRespository();
        this.PostTagsRespository = new PostTagsRespository();       
    }

    async addPost(post_data,user_id){
        const data = {...post_data.post, user_id:user_id};
        const newPost = await this.PostRespository.CreatePost(data);
        
        // removes duplicates
        const  uniqueTagNames = [...new Set(post_data.tags)];
        const tagObjects = uniqueTagNames.map(name => ({ tag_name: name }));

        const tags = await this.TagsRespository.createTags(tagObjects);
        const post_tags = tags.map(tag => ({
            tag_id : tag.tag_id,
            post_id : newPost.post_id
        }))
        const tagsPosts = await this.PostTagsRespository.CreatePostTags(post_tags)

        const postWithTags = {
            ...newPost,
            tags : tags.map(tag => ({
                tag_name : tag.tag_name
            }))
        }
        return postWithTags;
    }

    async getAllPostsOfUser(user_id){
        const posts = await this.PostRespository.getAllPostsbyUserId(user_id);
        return posts;
    }

    async getSpecificPost(post_id){
        const post = await this.PostRespository.getPost(post_id);
        return post;
    }

    async deleteSpecificPost(post_id){
        const deletedPost = await this.PostRespository.DeletePost(post_id);
        return deletedPost;
    }

    async increaseLikes(post_id){
        const post = await this.PostRespository.updatePostsLike(post_id);
        return post;
    }

}

module.exports =  PostsService