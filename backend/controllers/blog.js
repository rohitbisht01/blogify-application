const getAllBlogs = async (req, res) => {
  res.status(200).json({
    message: "All Blogs",
  });
};

const createBlog = async (req, res) => {
  try {
    const {} = req.body;
  } catch (error) {
    console.log("Error creating blog", error);
  }
};

module.exports = { getAllBlogs, createBlog };
