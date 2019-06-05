const User = require('../models/user');

module.exports.home = function(request, response) {
    return response.end("<h1>Users Home Page...</h1>");
};

module.exports.profile = function(request, response) {
    context = {
        'title': "User's Profile"
    };
    return response.render('users_profile', context);
};

module.exports.posts = function(request, response) {
    return response.end("<h1>User Posts Page</h1>");
};

// render sign-up page
module.exports.signup = function(request, response) {
    context = {
        'title': 'Codial User | Sign Up'
    };
    return response.render('user_signup', context);
};

// render sign-in page
module.exports.signin = function(request, response) {
  context = {
      'title': 'Codial User | Sign In'
  };
  return response.render('user_signin', context);
};

// get sign-up data
module.exports.create = function(request, response) {
//     check whether password and confirm password are equal or not
    if(request.body.password != request.body.retypePassword) {
        console.log("Passwords do not match...");
        return response.redirect('back');
    }

    User.findOne({ email: request.body.email }, function(error, user) {
        if(error) {
            console.log('Error in finding User...');
            return;
        }

        if(!user) {
            User.create(request.body, function(error, user) {
                console.log(request.body);
                // console.log(request.body.password);
                // console.log(request.body.retypePassword);
                // console.log(request.body.userName);
               if(error) {
                   console.log("Error while creating User...");
                   console.log(error);
                   return;
               }
               return response.redirect('/users/signin');
            });
        }
        else {
            return response.redirect('back');
        }
    });
};

// sign-in functionality & create a session for the user
module.exports.createSession = function(request, response) {
//    todo
};