const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const blogs = [
    { id: 1, title: "A better Blogger experience on the web", content: "Since 1999, millions of people have expressed themselves on Blogger..." },
    { id: 2, title: "An update on Google+ and Blogger", content: "Following the announcement of Google+ API deprecation..." },
    { id: 3, title: "It’s spring cleaning time for Blogger", content: "To make room for new, we’re simplifying the platform..." }
];

// Serve static frontend files
app.use(express.static(path.join(__dirname, "public")));

// Home Route (Serves index.html)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API Route - Fetch all blogs
app.get("/api/blogs", (req, res) => {
    res.json(blogs);
});

// API Route - Fetch a single blog by ID
app.get("/api/blog/:id", (req, res) => {
    const blog = blogs.find(b => b.id === parseInt(req.params.id));
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
