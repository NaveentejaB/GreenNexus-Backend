const Sequelize = require('sequelize-cockroachdb')

const {sequelize} = require('../config/DB')

if (!sequelize) {
    throw new Error('Sequelize instance is not initialized. Make sure to call connectDB first.');
}

const PostLikes = sequelize.define('PostLikes',{
    post_like_id : {
        type : Sequelize.DataTypes.UUID,
        defaultValue :Sequelize.DataTypes.UUIDV4,
        primaryKey : true
    },
    user_id : {
        type : Sequelize.DataTypes.UUID,
        allowNull : false
    },
    post_id : {
        type : Sequelize.DataTypes.UUID,
        allowNull : false
    },
    Created_at : {
        type:Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue : Date.now()
    }
},{
    tableName :'postLikes',
    timestamps : false,
    underscored : true,
    indexes : [
        {
            // unique : true,
            fields : ["user_id","post_id"]
        }
    ]
}) 

module.exports = PostLikes