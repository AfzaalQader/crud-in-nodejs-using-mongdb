const express = require("express");
const router = express.Router();
const UserController = require('./controller');
const auth = require('../../../middleware/auth')

router.get('/', auth.auth, UserController.getAllUsers)
// router.get('/:id', auth.auth, UserController.getUserById)
router.get('/get-user-by-id', auth.auth, UserController.getUserById)
router.post('/', UserController.createUser)
router.put('/', UserController.updateUser)
router.delete('/', UserController.deleteUser)
router.post('/login', UserController.loginUser)

module.exports = router;