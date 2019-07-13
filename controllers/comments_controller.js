const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.createComment = function(request, response) {
  Post.findById(request.body.post, function(error, post) {
     if(post) {
         Comment.create({
             content: request.body['comment-content'],
             post: request.body.post,
             user: request.user._id
         }, function(error, comment) {
            // handle error

            post.comments.push(comment);
            post.save();

            response.redirect('/');
         });
     }
  });
};