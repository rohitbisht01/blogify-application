const express = require("express");
const { getAllBlogs, createBlog, blogDetails } = require("../controllers/blog");
const { authMiddleware } = require("../controllers/user");
const { upload } = require("../utils/cloudinary");
const router = express.Router();

router.get("/", getAllBlogs);
router.post("/create", authMiddleware, upload.single("cover"), createBlog);
router.get("/:id", blogDetails);

module.exports = router;
