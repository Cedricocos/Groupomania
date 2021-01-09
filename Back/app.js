const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { Sequelize } = require('sequelize');
const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');
const comsRoutes = require('./routes/coms');
const path = require('path');

const sequelize = new Sequelize('mysql://Groupomania:S2mvIET5ntiIxoAs@localhost:3306/groupomania');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch( (error) => {
  console.error('Unable to connect to the database:', error);
});

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/posts', postsRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/coms', comsRoutes);

module.exports = app;