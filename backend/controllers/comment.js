const Comment = require("../models/comment");
const Blog = require("../models/blog");

const getComments = async (req, res) => {
  try {
    const { blogId } = req.params;
    if (!blogId) {
      return res.status(400).json({
        success: false,
        message: "No blog ID provided. Please specify a valid blog ID.",
      });
    }

    const existsBlog = await Blog.findById(blogId);
    if (!existsBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const comments = await Comment.find({ blog: blogId })
      .populate("user", "username")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    console.log("Error", error);
    res.status(400).json({
      success: false,
      message: "Error getting comments",
    });
  }
};

const createComment = async (req, res) => {
  try {
    const { comment } = req.body;

    const { blogId } = req.params;
    const user = req.user;

    if (!comment) {
      return res.status(400).json({
        success: false,
        message: "Comment is empty",
      });
    }

    const newComment = await Comment.create({
      comment,
      blog: blogId,
      user: user.id,
    });

    res.status(201).json({
      success: true,
      message: "Comment created",
      newComment,
    });
  } catch (error) {
    console.log("Error", error);
    res.status(400).json({
      success: false,
      message: "Error creating comment",
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;

    if (!commentId) {
      return res.status(400).json({
        success: false,
        message: "commentId is not provided",
      });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(400).json({
        success: false,
        message: "comment not found",
      });
    }

    if (comment.user.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete the comment",
      });
    }

    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({
      success: true,
      message: "Comment deleted",
    });
  } catch (error) {
    console.log("Error", error);
    res.status(400).json({
      success: false,
      message: "Error deleting comment",
    });
  }
};

const editComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { comment: newComment } = req.body;

    const userId = req.user.id;

    if (!commentId) {
      return res.status(400).json({
        success: false,
        message: "commentId is not provided",
      });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(400).json({
        success: false,
        message: "comment not found",
      });
    }

    if (comment.user.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to edit the comment",
      });
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { comment: newComment },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Comment updated",
      updatedComment,
    });
  } catch (error) {
    console.log("Error", error);
    res.status(400).json({
      success: false,
      message: "Error updating comment",
    });
  }
};

module.exports = { getComments, createComment, deleteComment, editComment };
