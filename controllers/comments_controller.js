const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.createComment = async function(request, response) {
    try {
        let post = await Post.findById(request.body.post);
        if(post) {
            let comment = await Comment.create({
                content: request.body['comment-content'],
                post: request.body.post,
                user: request.user._id
            });

            post.comments.push(comment);
            post.save();

            response.redirect('/');
        }
    }
    catch(error) {
        console.log('Error: ', error);
        return;
    }
};

module.exports.deleteComment = async function(request, response) {
    try {
        let comment = await Comment.findById(request.params.id);
        if(comment.user.toString() === request.user.id) {
            let postId = comment.post.toString();
            comment.remove();
            // below line pulls out the comments from the post using $pull and delete the comment with the id
            let post = await Post.findByIdAndUpdate(postId, { $pull: { comments: request.params.id } });

            return response.redirect('back');
        }
        else {
            return response.redirect('back');
        }
    }
    catch (error) {
        console.log('Error: ', error);
        return;
    }
};