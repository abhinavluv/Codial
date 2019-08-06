const User = require('../models/user');

module.exports.home = function(request, response) {
    return response.end("<h1>Users Home Page...</h1>");
};

module.exports.profile = function(request, response) {
    User.findById(request.params.id, function(error, user) {
        context = {
            title: "User's Profile",
            profile_user: user
        };
        return response.render('users_profile', context);
    });
};

module.exports.updateProfile = function(request, response) {
    console.log("Request.user.id: " + request.user.id + ' ' + typeof (request.user.id));
    console.log("Request.params.id: " + request.params.id + ' ' + typeof (request.params.id));
    console.log("Request.body.userName: " + request.body + ' ' + typeof (request.body));
  if(request.user.id === request.params.id) {
      User.findByIdAndUpdate(request.params.id, { $set: { userName: request.body.name, email:  request.body.email } }, function(error, user) {
          request.flash('success', 'Profile Updated Successfully!');
         return response.redirect('back');
      });
  }
  else {
      request.flash('error', 'You are not authorised to update the profile...');
      return response.status(401).send('Unauthorised');
  }
};

module.exports.posts = function(request, response) {
    return response.end("<h1>User Posts Page</h1>");
};

// render sign-up page
module.exports.signup = function(request, response) {
    if(request.isAuthenticated()) {
        return response.redirect('/users/profile');
    }
    context = {
        'title': 'Codial User | Sign Up'
    };
    return response.render('user_signup', context);
};

// render sign-in page
module.exports.signin = function(request, response) {
    if(request.isAuthenticated()) {
        return response.redirect('/users/profile');
    }
  context = {
      'title': 'Codial User | Sign In'
  };
  return response.render('user_signin', context);
};

// get sign-up data
module.exports.create = function(request, response) {
//     check whether password and confirm password are equal or not
    if(request.body.password != request.body.retypePassword) {
        request.flash('error', 'Passwords do not match!');
        return response.redirect('back');
    }

    User.findOne({ email: request.body.email }, function(error, user) {
        if(error) {
            request.flash('error', 'User not found...');
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
    request.flash('success', 'Logged in successfully...');
    return response.redirect('/');
};

module.exports.destroySession = function(request, response) {
    request.logout();
    request.flash('success', 'Logged out successfully...');
    return response.redirect('/');
}