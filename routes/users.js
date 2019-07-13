const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');
const passport = require('passport');

router.get('/', usersController.home);
// let user access profile page, only if logged in. This is being checked in checkAuthentication function in passport-local-strategy
router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
router.post('/update/:id', passport.checkAuthentication, usersController.updateProfile);
router.get('/posts', usersController.posts);
router.get('/signup', usersController.signup);
router.get('/signin', usersController.signin);
// route for creating user after user clicks on sign-up on sign-up page
router.post('/create', usersController.create);

// use passport as a middleware for authentication
router.post('/createSession', passport.authenticate(
    'local',
    { failureRedirect: '/users/signin' },
), usersController.createSession);
router.get('/signout', usersController.destroySession);
module.exports = router;