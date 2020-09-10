var Post = require("../models/post.model");
var Comment = require("../models/comments.model");
var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        req.flash("error", "You must be logged in to continue!");
        res.redirect("/user/login");
    }
}

middlewareObj.checkPostOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        
    }
}

module.exports = middlewareObj;