const Blog = require("../models/blog");

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).populate(
      "author",
      "username email createdAt"
    );

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
    const { title, summary, content, cover } = req.body;
    const user = req.user;
    console.log(user);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    if (!title || !summary || !content || !cover) {
      return res.status(400).json({
        success: false,
        message: "Fileds are missing",
      });
    }

    const blog = await Blog.create({
      title,
      summary,
      content,
      cover,
      author: user.id,
    });

    res.status(201).json({
      success: true,
      message: "Blog created",
      blog,
    });
  } catch (error) {
    console.log("Error creating blog", error);
  }
};

module.exports = { getAllBlogs, createBlog };
