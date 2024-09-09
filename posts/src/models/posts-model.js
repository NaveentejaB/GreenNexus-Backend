const Sequelize = require('sequelize-cockroachdb')

const {sequelize} = require('../config/DB')

if (!sequelize) {
    throw new Error('Sequelize instance is not initialized. Make sure to call connectDB first.');
}

const Post = sequelize.define('Post',{
    post_id : {
        type : Sequelize.DataTypes.UUID,
        defaultValue :Sequelize.DataTypes.UUIDV4,
        primaryKey : true
    },
    user_id : {
        type : Sequelize.DataTypes.UUID,
        allowNull : false
    },
    content : {
        type : Sequelize.DataTypes.STRING,
        allowNull : false
    },
    location : {
        type : Sequelize.DataTypes.STRING,
        allowNull : false
    },
    total_likes : {
        type : Sequelize.DataTypes.STRING,
        allowNull : false,
        defaultValue : "0"
    },
    Created_at : {
        type:Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue : Date.now()
    },
    Updated_at : {
        type:Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue : Date.now()
    }
},{
    tableName :'posts',
    timestamps : false,
    underscored : true,
    indexes : [
        {
            // unique : true,
            fields : ["user_id"]
        }
    ]
}) 

module.exports = Post