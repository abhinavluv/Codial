const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = function(request, response) {

    // response.cookie('user_id', 32);
    // console.log(request.cookies);

    // this function below fetches the userid since it is being stored in db
    // instead we will write a separate function which fetches us the complete user object along with the post object
    /*Post.find({}, function(error, posts) {
        context = {
            title: 'Codial | Home Page',
            posts: posts
        };
        return response.render('home', context);
    });*/

    // the below function till populate('user') finds all the post and populates user of each post
    Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
        .exec(function(error, posts) {
            User.find({}, function(error, users) {
                context = {
                    title: 'Codial | Home Page',
                    posts: posts,
                    all_users: users
                };
                return response.render('home', context);
            });


    });
    };