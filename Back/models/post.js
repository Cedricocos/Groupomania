const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize(`${process.env.DATABASESYSTEM}://${process.env.DATABASEUSER}:${process.env.DATABASEPASSWORD}@${process.env.DATABASESITE}:${process.env.DATABASEPORT}/${process.env.DATABASETABLE}`);
const User = require('../models/User');

const Post = sequelize.define('Post', {
  id:  { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER },
  by: { type: DataTypes.STRING },
  title: { type: DataTypes.STRING, allowNull: false },
  text: { type: DataTypes.STRING, allowNull: false },
  imageUrl: { type: DataTypes.STRING }
});
  
Post.sync();

User.hasMany(Post, {foreignKey: "userId"});

module.exports = sequelize.model('Post', Post);