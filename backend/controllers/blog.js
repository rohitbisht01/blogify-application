const Blog = require("../models/blog");
const { uploadToCloudinary } = require("../utils/cloudinary");

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({})
      .populate("author", "username email createdAt")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    console.log("Error getting all blogs", error);
    res.status(400).json({
      success: false,
      message: "Error getting blogs",
    });
  }
};

const blogDetails = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Id is missing",
      });
    }

    const blog = await Blog.findById(id).populate(
      "author",
      "username email createdAt"
    );

    if (!blog) {
      return res.status(400).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    console.log("Error getting blog details by id", error);
    res.status(400).json({
      success: false,
      message: "Error getting blog by id",
    });
  }
};

const createBlog = async (req, res) => {
  try {
    const { title, summary, content } = req.body;
    const user = req.user;

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    if (!title || !summary || !content || !req.file) {
      return res.status(400).json({
        success: false,
        message: "Fileds are missing",
      });
    }

    const base64 = Buffer.from(req.file.buffer).toString("base64");
    const imageUrl = "data:" + req.file.mimetype + ";base64," + base64;
    const cloudinaryUrl = await uploadToCloudinary(imageUrl);

    const blog = await Blog.create({
      title,
      summary,
      content,
      cover: cloudinaryUrl.url,
      author: user.id,
    });

    res.status(201).json({
      success: true,
      message: "Blog created",
      blog: blog,
    });
  } catch (error) {
    console.log("Error creating blog", error);
  }
};

module.exports = { getAllBlogs, createBlog, blogDetails };
