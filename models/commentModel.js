const mongoose = require("../db");

const commentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Blog", required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
