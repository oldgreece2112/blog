var express = require("express");
var User = require("../models/user.model");
var post = require("../models/post.model");
var middleware = require("../middleware");
var router = express.Router();

router.get("/view/:id", (req, res) => {

});

router.get("/create", middleware.isLoggedIn , (req, res) => {

});

router.post("/create", middleware.isLoggedIn , (req, res) => {

});

router.get("/edit/:id",middleware.checkPostOwnership, (req, res) => {

});

router.post("/edit/:id",middleware.checkPostOwnership, (req, res) => {

});

router.get("/destroy/:id",middleware.checkPostOwnership, (req, res) => {

});

module.exports = router;