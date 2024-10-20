const express = require("express");
const {
  getComments,
  createComment,
  deleteComment,
  editComment,
} = require("../controllers/comment");
const { authMiddleware } = require("../controllers/user");
const router = express.Router();

router.get("/:blogId", getComments);
router.post("/:blogId", authMiddleware, createComment);
router.put("/:commentId", authMiddleware, editComment);
router.delete("/:commentId", authMiddleware, deleteComment);

module.exports = router;
