const Sequelize = require('sequelize-cockroachdb')

const {sequelize} = require('../config/DB')

if (!sequelize) {
    throw new Error('Sequelize instance is not initialized. Make sure to call connectDB first.');
}

const Follows = sequelize.define('Follows',{
    follows_id : {
        type : Sequelize.DataTypes.UUID,
        defaultValue :Sequelize.DataTypes.UUIDV4,
        primaryKey : true
    },
    follower_id : {
        type : Sequelize.DataTypes.UUID,
        allowNull : false
    },
    followee_id : {
        type : Sequelize.DataTypes.UUID,
        allowNull : false
    },
    Created_at : {
        type:Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue : Date.now()
    }
},{
    tableName :'follows',
    timestamps : false,
    underscored : true,
    indexes : [
        {
            // unique : true,
            fields : ["followee_id","follower_id"]
        }
    ]
}) 

module.exports = Follows