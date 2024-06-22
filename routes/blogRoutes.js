const express = require("express");
const router = express.Router();
const Blog = require("../models/blogModel");
const { ObjectId } = require("mongoose").Types;

// Create a new blog
router.post("/", async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).send(blog);
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).send({ message: "Error creating blog" });
  }
});

// Get all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.send(blogs);
  } catch (error) {
    console.error("Error getting blogs:", error);
    res.status(500).send({ message: "Error getting blogs" });
  }
});

// Get a specific blog by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Invalid blog ID" });
  }

  try {
    const blog = await Blog.findById(id);
    if (blog) {
      res.send(blog);
    } else {
      res.status(404).send({ message: "Blog not found" });
    }
  } catch (error) {
    console.error("Error getting blog:", error);
    res.status(500).send({ message: "Error getting blog" });
  }
});

// Update a blog
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  console.log("Received update request for blog ID:", id);

  if (!ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Invalid blog ID" });
  }

  try {
    const blog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
    if (blog) {
      res.send(blog);
    } else {
      res.status(404).send({ message: "Blog not found" });
    }
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).send({ message: "Error updating blog" });
  }
});

// Delete a blog
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Invalid blog ID" });
  }

  try {
    const blog = await Blog.findByIdAndDelete(id);
    if (blog) {
      res.status(204).send();
    } else {
      res.status(404).send({ message: "Blog not found" });
    }
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).send({ message: "Error deleting blog" });
  }
});

module.exports = router;
