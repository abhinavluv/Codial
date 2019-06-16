const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// authentication using passport
// done can take 2 parameters 1st is error and 2nd is whether authenticated or not
passport.use(new LocalStrategy({
    usernameField: 'email'
}, function (email, password, done) {
    // find a user and establish identity
    User.findOne({ email: email }, function(error, user) {
       if(error) {
           console.log("Error in finding user --> Passport");
           // passing error to done
           return done(error);
       }
       if(!user || user.password != password) {
           console.log("Invalid username password");
           // passing null as error(1st arg) since no error. false as 2nd arg since authentication not done
           return done(null, false);
       }

       // if user is authenticated, return null as error and user as 2nd arg
       return done(null, user);
    });
}));

// serializing the user to decide which key is to be kept in the cookies
// browser send the user.id in the cookie
passport.serializeUser(function(user, done) {
   done(null, user.id);
});

// deserializing the user from the key in the cookies
// browser receives the cookie with the user's info and to access the info, it deserializes the user
passport.deserializeUser(function(id, done) {
   User.findById(id, function(error, user) {
      if(error) {
          console.log("Error in finding user --> Passport");
          return done(error);
      }
      return done(null, user);
   });
});

// check if user is authenticated
passport.checkAuthentication = function(request, response, next) {
  //  if user is signed in, pass on the request to the next function (which is controller's action)
  if(request.isAuthenticated()) {
      return next();
  }

//   if user is not signed in
    return response.redirect('/users/signin');
};

passport.setAuthenticatedUser = function(request, response, next) {
    if(request.isAuthenticated()) {
        // request.user contains the current signedin user info from the cookie and we are sending it to locals for views
        response.locals.user = request.user;
    }
    next();
};

module.exports = passport;