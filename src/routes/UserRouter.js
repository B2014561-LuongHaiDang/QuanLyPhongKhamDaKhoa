const express = require("express");
const router = express.Router()
const UserController = require('../controllers/UserController');
const { checkAuth, authMiddelware, authUserMiddelware } = require("../middelware/authMiddelware");

router.post('/signup', UserController.createUser)
router.post('/signin', UserController.loginUser)
router.post('/logout', UserController.logoutUser)
router.put('/update-user', checkAuth, UserController.updateUser)
router.delete('/delete-user/:id', UserController.deleteUser)
router.get('/getAll', UserController.getAllUser)
router.get('/get-details/:id', authUserMiddelware, UserController.getDetailsUser)
// router.get('/getDetails',checkAuth, UserController.getDetailsUser)
router.post('/refresh-token', UserController.refreshToken)

module.exports = router