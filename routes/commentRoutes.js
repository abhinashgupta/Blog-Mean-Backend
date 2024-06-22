const express = require("express");
const router = express.Router();
const Comment = require("../models/commentModel");
const { ObjectId } = require("mongoose").Types;

// Get comments for a blog post
router.get("/", async (req, res) => {
  const postId = req.query.postId;

  if (!ObjectId.isValid(postId)) {
    return res.status(400).send({ message: "Invalid post ID" });
  }

  try {
    const postComments = await Comment.find({ postId });
    res.send(postComments);
  } catch (error) {
    console.error("Error getting comments:", error);
    res.status(500).send({ message: "Error getting comments" });
  }
});

// Add a new comment to a blog post
router.post("/", async (req, res) => {
  const { postId, content, author } = req.body;

  if (!postId || !ObjectId.isValid(postId)) {
    return res.status(400).send({ message: "Invalid or missing postId" });
  }

  if (!content) {
    return res.status(400).send({ message: "Content is required" });
  }

  if (!author) {
    return res.status(400).send({ message: "Author is required" });
  }

  try {
    const comment = new Comment({ postId, content, author });
    await comment.save();
    res.status(201).send(comment);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).send({ message: "Error adding comment" });
  }
});

module.exports = router;
