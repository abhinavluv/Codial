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

            request.flash('success', 'Comment added...');
            response.redirect('/');
        }
    }
    catch(error) {
        console.log('Error: ', error);
        request.flash('error', error);
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

            request.flash('success', 'Comment deleted...');
            return response.redirect('back');
        }
        else {
            request.flash('error', 'Not authorised to delete comment...');
            return response.redirect('back');
        }
    }
    catch (error) {
        request.flash('error', error);
        console.log('Error: ', error);
        return;
    }
};