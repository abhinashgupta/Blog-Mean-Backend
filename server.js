const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("./db");
require("dotenv").config();

// Import route handlers
const blogRoutes = require("./routes/blogRoutes");
const commentRoutes = require("./routes/commentRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Use routes
app.use("/api/blogs", blogRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
