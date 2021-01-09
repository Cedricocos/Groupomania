const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql://Groupomania:S2mvIET5ntiIxoAs@localhost:3306/groupomania');


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