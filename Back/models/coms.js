const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql://Groupomania:S2mvIET5ntiIxoAs@localhost:3306/groupomania');
const Post = require('../models/Post');

const Coms = sequelize.define('Coms', {
  id:  { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.STRING },
  postId: { type: DataTypes.STRING },
  by: { type: DataTypes.STRING },
  text: { type: DataTypes.STRING, allowNull: false }
});
  
Coms.sync();

Post.hasMany(Coms);

module.exports = sequelize.model('Coms', Coms);