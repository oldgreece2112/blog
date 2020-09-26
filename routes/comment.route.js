var express = require("express");
var User = require("../models/user.model");
var Comment = require("../models/comments.model");
var Post = require("../models/post.model");
var router = express.Router();

router.post("/create/:postID", (req, res) => {
    var id = req.params.id;

    var text = req.body.text;

    var newComment = {
        post: id,
        text,
        author: req.user.username
    }

    Post.findById(id, (err, foundPost) => {
        if(err){
            console.log(err);
        }else{
            Comment.create(newComment, (err, newComment) => {
                if(err){
                    console.log(err);
                }else{
                    foundPost.comments.push({
                        id: newComment._id,
                        author: req.user.username
                    });
                    foundPost.save();
                    res.redirect("/posts/view/" + id);
                }
            });
        }
    });
});

router.get("/edit/:commentID", (req, res) => {
    var id = req.params.commentID;

    Comment.findById(id, (err, comment) => {
        if(err){
            console.log(err);
        }else{
            res.render("comments/edit", {comment});
        }
    });
});

router.post(":postID/edit/:commentID", (req, res) => {
    var id = req.params.commentID;

    var text = req.body.text;

    Comment.findById(id, (err, foundComment) => {
        if(err){
            console.log(err);
        }else{
            foundComment.text = text;
            foundComment.save();
            res.redirect("/posts/view/" + req.params.postID);
        }
    });
});

router.get("destroy/:commentID", (req, res) => {
    var id = req.params.commentID;

    Comment.findByIdAndDelete(id, (err) => {
        if(err){
            console.log(err);
        }else{
            req.flash("success", "You have successfully deleted your comment!");
            res.redirect("/");
        }
    })
});

module.exports  = router;