var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    text: String,
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }
});

module.exports = mongoose.model("Comment", commentSchema);