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

module.exports.deleteComment = function(request, response) {
  Comment.findById(request.params.id, function(error, comment) {
     if(comment.user.toString() === request.user.id) {
         let postId = comment.post.toString();
         comment.remove();
         // below line pulls out the comments from the post using $pull and delete the comment with the id
         Post.findByIdAndUpdate(postId, { $pull: { comments: request.params.id } }, function(error, post) {
            return response.redirect('back');
         });
     }
     else {
         return response.redirect('back');
     }
  });
};