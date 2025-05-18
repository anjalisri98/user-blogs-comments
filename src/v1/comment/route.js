// src/v1/comment/route.js
const express = require('express');
const router = express.Router();
const commentController = require('./controller');
const Auth = require('../../middlewares/auth');

//for posting comment 
router.post('/add', Auth.authenticateUser, Auth.findUser, commentController.createComment);

//to get all comments on a blog
router.get('/blog/:blogId', commentController.getComments);

module.exports = router;
