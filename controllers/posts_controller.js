const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.createPost = async function(request, response) {
    try {
        Post.create({
            content: request.body.content,
            user: request.user._id
        });

        request.flash('success', 'Post Created...');
        return response.redirect('back');
    }
    catch (error) {
        request.flash('error', error);
        return response.redirect('back');
    }
};

module.exports.deletePost = async function(request, response) {

    try {
        let post = await Post.findById(request.params.id);
        // request.user.id is equal to request.user._id. The former is given by mongoose which converts the id to a string whereas later is the actual datatype
        console.log(typeof (post.user.toString()) + ' > ' + typeof (request.user.id));
        // console.log(request.params.id);
        //  below checks if logged in user has created the post or not. if created, user can delete the post
        if(post.user.toString() === request.user.id) {
            post.remove();
            await Comment.deleteMany({ post: request.params.id });
            request.flash('success', 'Post deleted...');
            return response.redirect('back');
        }
        // user and id didnt match
        else {
            request.flash('error', 'You cannot delete this post...');
            return response.redirect('back');
        }
    }
    catch (error) {
        request.flash('error', error);
        return response.redirect('back');
    }
};