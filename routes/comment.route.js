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

});

router.post("/edit/:commentID", (req, res) => {

});

router.get("destroy/:postID/:commentID", (req, res) => {

});

module.exports  = router;