const Sequelize = require('sequelize-cockroachdb')

const {sequelize} = require('../config/DB')

if (!sequelize) {
    throw new Error('Sequelize instance is not initialized. Make sure to call connectDB first.');
}

const Tags = sequelize.define('Tags',{
    tag_id : {
        type : Sequelize.DataTypes.UUID,
        defaultValue :Sequelize.DataTypes.UUIDV4,
        primaryKey : true
    },
    tag_name : {
        type : Sequelize.DataTypes.STRING,
        allowNull : false
    },
    Created_at : {
        type:Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue : Date.now()
    }
},{
    tableName :'tags',
    timestamps : false,
    underscored : true,
}) 

module.exports = Tags