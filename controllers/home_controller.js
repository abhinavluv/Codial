module.exports.home = function(request, response) {
    context = {
        title: 'Codial Home Page'
    };
    return response.render('home', context);
};