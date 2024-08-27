const Sequelize = require('sequelize-cockroachdb');
const { sequelize } = require('../config/DB');

if (!sequelize) {
  throw new Error('Sequelize instance is not initialized. Make sure to call connectDB first.');
}

// Define the EmailOTP model
const EmailOTP = sequelize.define(
  'EmailOTP',
  {
    // Primary key
    user_id: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_email: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    otp: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Define hooks as part of the model options
    hooks: {
      afterCreate: (user, options) => {
        setTimeout(async () => {
          try {
            await user.destroy();
            console.log(`User ${user.user_id} automatically deleted after 60 seconds.`);
          } catch (error) {
            console.error(`Error deleting user ${user.user_id}:`, error);
          }
        }, 60000); // 60000 milliseconds = 60 seconds
      },
    },
  }
);

module.exports = EmailOTP;
