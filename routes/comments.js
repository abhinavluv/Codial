const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/comments_controller');
const passport = require('passport');

router.post('/createComment', passport.checkAuthentication, commentsController.createComment);

module.exports = router;