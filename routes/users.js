const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');

router.get('/', usersController.home);
router.get('/profile', usersController.profile);
router.get('/posts', usersController.posts);
router.get('/signup', usersController.signup);
router.get('/signin', usersController.signin);
// route for creating user after user clicks on sign-up on sign-up page
router.post('/create', usersController.create);
module.exports = router;