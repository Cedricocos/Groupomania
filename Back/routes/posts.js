const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postsCtrl = require('../controllers/Posts');

/* GET ALL POSTS*/
router.get('/', postsCtrl.getAllPosts);
/* CREATE ONE POST */
router.post('/', auth, multer, postsCtrl.createPost);
// /* GET POST BY ID */
// router.get('/:id', auth, postsCtrl.getOnePost);
/* UPDATE ONE POST */
router.put('/:id', auth, multer, postsCtrl.modifyPost);
/* DELETE ONE POST */
router.delete('/:id', auth, postsCtrl.deletePost);


    
module.exports = router;