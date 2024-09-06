const Sequelize = require('sequelize-cockroachdb')

const {sequelize} = require('../config/DB')

if (!sequelize) {
    throw new Error('Sequelize instance is not initialized. Make sure to call connectDB first.');
}

const Comment = sequelize.define('Comment',{
    comment_id : {
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
    content : {
        type : Sequelize.DataTypes.STRING,
        allowNull : false
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
    tableName :'comments',
    timestamps : false,
    underscored : true,
    indexes : [
        {
            // unique : true,
            fields : ["post_id","user_id"]
        }
    ]
}) 

module.exports = Comment