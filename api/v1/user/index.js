const express = require("express");
const router = express.Router();
const UserController = require('./controller');

router.get('/', UserController.getAllUsers)
router.get('/:id', UserController.getUserById)
router.post('/', UserController.createUser)
router.put('/', UserController.updateUser)
router.delete('/', UserController.deleteUser)

module.exports = router;