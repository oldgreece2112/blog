if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}

//package initialization
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var passportLocal = require('passport-local');
var flash = require("connect-flash");
var app = express();

var User = require("./models/user.model");

//app configuration
var PORT = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
//database configuration
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function(){
    console.log("Connected to database");
});

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new passportLocal(User.authenticate()));

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
    next();
});

app.listen(PORT, process.env.IP, function(){
    console.log("Server listening on port " + PORT);
});