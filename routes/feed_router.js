const express = require('express');
const { body } = require('express-validator');

const feedController = require('../controllers/feed_controller');
const isAuth = require('../util/is-auth');

const router = express.Router();

router.get('/posts', isAuth, feedController.getPosts); // GET /feed/posts

router.get('/post/:postId', isAuth, feedController.getPost);

router.post(
  '/post',
  isAuth,
  [
    body('title').trim().isLength({ min: 5 }),
    body('content').trim().isLength({ min: 5 }),
  ],
  feedController.createPost
); // POST /feed/post

router.put(
  '/post/:postId',
  isAuth,
  [
    body('title').trim().isLength({ min: 5 }),
    body('content').trim().isLength({ min: 5 }),
  ],
  feedController.updatePost
);

router.delete('/post/:postId', isAuth, feedController.deletePost);

module.exports = router;
