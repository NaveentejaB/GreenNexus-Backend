const Sequelize = require('sequelize-cockroachdb')

const {sequelize} = require('../config/DB')

if (!sequelize) {
    throw new Error('Sequelize instance is not initialized. Make sure to call connectDB first.');
}

// relation table
const PostTags = sequelize.define('PostTags',{
    post_tag_id : {
        type : Sequelize.DataTypes.UUID,
        defaultValue :Sequelize.DataTypes.UUIDV4,
        primaryKey : true
    },
    post_id : {
        type : Sequelize.DataTypes.UUID,
        allowNull : false
    },
    tag_id : {
        type : Sequelize.DataTypes.UUID,
        allowNull : false,
    }
},{
    tableName :'tags',
    timestamps : false,
    underscored : true,
    indexes : [
        {
            fields : ["tag_id"]
        },{
            fields : ["post_id"]
        }
    ]
}) 

module.exports = PostTags