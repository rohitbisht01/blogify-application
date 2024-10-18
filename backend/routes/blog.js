const express = require("express");
const { getAllBlogs, createBlog } = require("../controllers/blog");
const { authMiddleware } = require("../controllers/user");
const router = express.Router();

router.get("/", getAllBlogs);
router.post("/create", authMiddleware, createBlog);

module.exports = router;
