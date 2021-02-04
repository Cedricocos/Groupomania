const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize(`${process.env.DATABASESYSTEM}://${process.env.DATABASEUSER}:${process.env.DATABASEPASSWORD}@${process.env.DATABASESITE}:${process.env.DATABASEPORT}/${process.env.DATABASETABLE}`);
const Post = require('../models/Post');
const User = require('./User');

const Coms = sequelize.define('Coms', {
  id:  { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER },
  postId: { type: DataTypes.INTEGER },
  by: { type: DataTypes.STRING },
  text: { type: DataTypes.STRING, allowNull: false }
});
  
Coms.sync();

Post.hasMany(Coms, {foreignKey: "postId"});
User.hasMany(Coms, {foreignKey: "userId"});

module.exports = sequelize.model('Coms', Coms);