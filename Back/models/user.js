const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize(`${process.env.DATABASESYSTEM}://${process.env.DATABASEUSER}:${process.env.DATABASEPASSWORD}@${process.env.DATABASESITE}:${process.env.DATABASEPORT}/${process.env.DATABASETABLE}`);

const User = sequelize.define('User', {
  id:  { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },
  fName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});

// the defined model is the class itself
console.log(User === sequelize.models.User); // true

User.sync();
  
module.exports = sequelize.model('User', User);