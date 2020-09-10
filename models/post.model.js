var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
    title: String,
    text: String,
    comments: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comments"
        },
        username: String
    }],
    date: {
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model("Post", postSChema);