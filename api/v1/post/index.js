const express = require("express");
const router = express.Router();
const PostController = require('./controller');
const auth = require('../../../middleware/auth')

router.get('/', auth.auth, PostController.getAllPost)
router.get('/:id', auth.auth, PostController.getPostById)
router.post('/', auth.auth, PostController.createPost)
router.put('/', auth.auth, PostController.updatePost)
router.delete('/', auth.auth, PostController.deletePost)

module.exports = router;