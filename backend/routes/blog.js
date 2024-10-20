const express = require("express");
const {
  getAllBlogs,
  createBlog,
  blogDetails,
  updateBlog,
  deleteBlog,
} = require("../controllers/blog");
const { authMiddleware } = require("../controllers/user");
const { upload } = require("../utils/cloudinary");
const router = express.Router();

router.get("/", getAllBlogs);
router.post("/create", authMiddleware, upload.single("cover"), createBlog);
router.put(
  "/update/:blogId",
  authMiddleware,
  upload.single("cover"),
  updateBlog
);
router.get("/:id", blogDetails);
router.delete("/:id", deleteBlog);

module.exports = router;
