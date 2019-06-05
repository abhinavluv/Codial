module.exports.home = function(request, response) {

    // response.cookie('user_id', 32);
    // console.log(request.cookies);
    context = {
        title: 'Codial Home Page'
    };
    return response.render('home', context);
};