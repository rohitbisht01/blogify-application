const Blog = require("../models/blog");
const { uploadToCloudinary } = require("../utils/cloudinary");

const getAllBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;

    const totalBlogs = await Blog.countDocuments();
    const dataPerPage = 3;
    const skip = (page - 1) * dataPerPage;

    const blogs = await Blog.find({})
      .populate("author", "username email createdAt")
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(dataPerPage);

    res.status(200).json({
      success: true,
      blogs,
      totalBlogs,
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
    res.status(400).json({
      success: false,
      message: "Error creating blog",
    });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { title, summary, content, cover } = req.body;
    const { blogId } = req.params;

    if (!blogId) {
      return res.status(400).json({
        success: false,
        message: "Blog Id is missing",
      });
    }

    // if (!title || !summary || !content || !req.file) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Fileds are missing",
    //   });
    // }

    let cloudinaryUrl;

    // Only upload new image if it exists
    if (req.file) {
      const base64 = Buffer.from(req.file.buffer).toString("base64");
      const imageUrl = "data:" + req.file.mimetype + ";base64," + base64;
      cloudinaryUrl = await uploadToCloudinary(imageUrl);
    }

    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        title,
        summary,
        content,
        cover: cloudinaryUrl ? cloudinaryUrl.url : cover,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Blog updated",
      blog: blog,
    });
  } catch (error) {
    console.log("Error updating blog", error);
    res.status(400).json({
      success: false,
      message: "Error updating blog",
    });
  }
};

const deleteBlog = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "id not defined",
    });
  }

  try {
    const blog = await Blog.findById(id);
    console.log(blog);

    if (!blog) {
      return res.status(400).json({
        success: false,
        message: "Blog does not exists",
      });
    }

    await Blog.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Blog deleted",
    });
  } catch (error) {
    console.log("Error deleting blog", error);
    res.status(400).json({
      success: false,
      message: "Error deleting blog",
    });
  }
};

module.exports = {
  getAllBlogs,
  createBlog,
  blogDetails,
  updateBlog,
  deleteBlog,
};
