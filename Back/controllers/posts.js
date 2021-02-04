const Post = require('../models/Post');
const Com = require('../models/Coms')
const jwt = require('jsonwebtoken');
const fs = require('fs');

/* CREATE ONE POST */
exports.createPost = (req, res, next) => {
  let postbody = JSON.parse(req.body.post);
  const post = new Post({
    ...postbody,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  post.save()
    .then(() => res.status(201).json({ message: 'Post enregistré !' }))
    .catch(error => res.status(400).json({ error }));
};

/* UPDATE ONE POST */
exports.modifyPost = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'M0NS1T3GR0UP0M4N14');
  var reqbody = null;
  var post = JSON.parse(req.body.post);
  // console.log(decodedToken.isAdmin)
  if (decodedToken.userId == post.userId || decodedToken.isAdmin == true) {
    // console.log(post);
    // console.log(req.file);
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
    // console.log(reqbody);
    Post.findOne({
      where: {
        id: req.params.id
      }
    }).then(post => {
      if (req.file) {
        const filename = post.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Post.update({
            ...reqbody, id: post.id
          },
            {
              where: {
                id: post.id
              }
            })
            .then(() => res.status(201).json({ message: 'Post modifié !' }))
            .catch(error => res.status(400).json({ error }));
        })
      } else {
        Post.update({
          ...reqbody, id: post.id
        },
          {
            where: {
              id: post.id
            }
          })
          .then(() => res.status(201).json({ message: 'Post modifié !' }))
          .catch(error => res.status(400).json({ error }));
      }

    })
  }
};

/* DELETE ONE POST */
exports.deletePost = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'M0NS1T3GR0UP0M4N14');
  // console.log(req.params.id);
  Post.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(post => {
      if (decodedToken.userId == post.userId || decodedToken.isAdmin == true) {
        const filename = post.imageUrl.split('/images/')[1];
        // console.log(post.imageUrl);
        fs.unlink(`images/${filename}`, () => {
          Post.destroy({
            where: {
              id: req.params.id
            }
          }).then(() => res.status(200).json({ message: 'Post supprimé !' }))
            .catch(error => res.status(400).json({ error }));
        });
      } else { }
    })

};

// /* GET POST BY ID */
// exports.getOnePost = (req, res, next) => {
//     Post.findOne({ _id: req.params.id })
//         .then(post => res.status(200).json(post))
//         .catch(error => res.status(404).json({ error }));
// };

/* GET ALL POSTS*/
exports.getAllPosts = (req, res, next) => {
  Post.findAll({
    include: Com,
    order: [["createdAt", "DESC"],
    [Com, "createdAt", "DESC"]
    ]
  })
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }));
};