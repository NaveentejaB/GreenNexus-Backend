const Tags = require("../models/tags-model")

class TagsRespository{
    async createTags(tag_data){
        // it is just update the duplicates, but there is nothing to change and creates new tag names
        const tags = await Tags.bulkCreate(tag_data,{
            updateOnDuplicate : 'tag_name',
            returning : true
        });
        return tags;
    }

    async getTagById(tag_id){
        const tag = await Tags.findByPk(tag_id);
        return tag;
    }

    async deleteTag(tag_id){
        const tag = await Tags.findByPk(tag_id);
        await tag.destroy();
        return tag;
    }
}

module.exports = TagsRespository