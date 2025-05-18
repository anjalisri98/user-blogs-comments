// src/v1/user/route.js
const express = require('express');
const router = express.Router();
const userController = require('./controller');
const Auth = require('../../middleware/auth');
const upload = require('../../middleware/upload');

//for signup as a new user
router.post('/signup', userController.signup);

//for login as a registered user
router.post('/login', userController.login);

//for details of user
router.get('/details', Auth.au, userController.getUserDetails);

//for uploading profile image
router.post('/upload-profile-image', Auth.auth, upload.single('profileImage'), userController.uploadProfileImage);

module.exports = router;
