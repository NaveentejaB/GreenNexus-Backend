
const Sequelize = require('sequelize-cockroachdb')

const {sequelize} = require('../config/DB')



if (!sequelize) {
    throw new Error('Sequelize instance is not initialized. Make sure to call connectDB first.');
  }

const User = sequelize.define("User", {
    // primary key
    user_id:{
        type:Sequelize.DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    
})

module.exports = User;