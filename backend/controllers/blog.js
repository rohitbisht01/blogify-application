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

module.exports = { getAllBlogs, createBlog };
