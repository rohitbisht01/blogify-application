const express = require("express");
const { getAllBlogs, createBlog } = require("../controllers/blog");
const router = express.Router();

router.get("/", getAllBlogs);
router.post("/", createBlog);

module.exports = router;
