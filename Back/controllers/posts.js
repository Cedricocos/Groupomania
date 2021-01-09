const Post = require('../models/Post');
const fs = require('fs');

/* CREATE ONE POST */
exports.createPost = (req, res, next) => {
    delete req.body._id;
    let postbody = JSON.parse(req.body.post);
    const post = new Post({
      ...postbody,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    post.save()
      .then(() => res.status(201).json({ message: 'Post enregistré !'}))
      .catch(error => res.status(400).json({ error }));
};

/* UPDATE ONE POST */
exports.modifyPost = (req, res, next) => {
  var reqbody = null;  
  var post = JSON.parse(req.body.post);
  if (req.file) {
      reqbody = {
        ...post,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      }
    } else { 
      reqbody = {
        ...post
      }
    };
    Post.update({ 
      ...reqbody, id: post.id
    },
      { 
        where: {
          id: post.id 
        }})
        .then(() => res.status(201).json({ message: 'Post modifié !'}))
        .catch(error => res.status(400).json({ error }));
};

/* DELETE ONE POST */
exports.deletePost = (req, res, next) => {
    Post.findOne({ id: req.params.id })
    .then(post => {
      const filename = post.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Post.destroy({ 
          where: { 
            id: req.params.id 
          }
        }).then(() => res.status(200).json({ message: 'Post supprimé !'}))
            .catch(error => res.status(400).json({ error }));
      });
})};

// /* GET POST BY ID */
// exports.getOnePost = (req, res, next) => {
//     Post.findOne({ _id: req.params.id })
//         .then(post => res.status(200).json(post))
//         .catch(error => res.status(404).json({ error }));
// };

/* GET ALL POSTS*/
exports.getAllPosts = (req, res, next) => {
    Post.findAll()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
};