const express = require("express");
const { getAllBlogs, createBlog } = require("../controllers/blog");
const { authMiddleware } = require("../controllers/user");
const { upload } = require("../utils/cloudinary");
const router = express.Router();

router.get("/", getAllBlogs);
router.post("/create", authMiddleware, upload.single("cover"), createBlog);

module.exports = router;
