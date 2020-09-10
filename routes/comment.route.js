var express = require("express");
var User = require("../models/user.model");
var Comment = require("../models/comments.model");
var Post = require("../models/post.model");
var router = express.Router();

router.post("/create/:postID", (req, res) => {

});

router.get("/edit/:commentID", (req, res) => {

});

router.post("/edit/:commentID", (req, res) => {

});

router.get("destroy/:postID/:commentID", (req, res) => {

});

module.exports  = router;