const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.createPost = function(request, response) {
    Post.create({
        content: request.body.content,
        user: request.user._id
    }, function(error, post) {
       if(error) {
           console.log("Error in creating the post...");
           return;
       }
       return response.redirect('back');
    });
};

module.exports.deletePost = function(request, response) {
  Post.findById(request.params.id, function(error, post) {
     // request.user.id is equal to request.user._id. The former is given by mongoose which converts the id to a string whereas later is the actual datatype
      console.log(typeof (post.user.toString()) + ' > ' + typeof (request.user.id));
      // console.log(request.params.id);
     //  below checks if logged in user has created the post or not. if created, user can delete the post
     if(post.user.toString() === request.user.id) {

         post.remove();
         Comment.deleteMany({ post: request.params.id }, function(error) {
            return response.redirect('back');
         });
     }
     // user and id didnt match
     else {
         return response.redirect('back');
     }
  });
};