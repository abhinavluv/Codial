module.exports.home = function(request, response) {
    return response.end("<h1>Users Home Page...</h1>");
};

module.exports.profile = function(request, response) {
    return response.end("<h1>User Profile!</h1>");
};

module.exports.posts = function(request, response) {
    return response.end("<h1>User Posts Page</h1>");
};