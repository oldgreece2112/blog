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
        Post.findById(req.params.id, (err, foundPost) => {
            if(err){
                res.redirect("back");
            }else{
                if(foundPost.author === req.user.username){
                    next();
                }else{
                    res.redirect("back");
                }
            }
        })
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.id, (err, foundComment) => {
            if(err){
                res.redirect("back");
            }else if(foundComment.author === req.user.username){
                next();
            }else{
                res.rediret("back");
            }
        });
    }
}

module.exports = middlewareObj;