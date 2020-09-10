var express = require("express");
var passport = require("passport");
var User = require("../models/user.model");
var router = express.Router();

router.get("/login", (req, res) => {
    res.render("user/login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/user/login"
}), (req, res) => {

});

router.get("/register", (req, res) => {
    res.render("user/register");
});

router.post("/register", (req, res) => {
    var username = req.body.username;
    var email = req.body.email;
    var posts = Array();

    var newUser = {
        username,
        email,
        posts
    };
    
    User.register(newUser, req.body.password, (err, newUser) => {
        if(err){
            req.flash("error", err.message);
            res.redirect("/user/register");
        }
        passport.authenticate("local")(req, res, () => {
            req.flash("success", "Welcome! " + newUser.username);
            res.redirect("/");
        });
    });
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

module.exports  = router;