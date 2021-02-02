const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql://Groupomania:S2mvIET5ntiIxoAs@localhost:3306/groupomania');
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