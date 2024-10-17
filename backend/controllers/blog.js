const getAllBlogs = (req, res) => {
  res.status(200).json({
    message: "All Blogs",
  });
};

module.exports = { getAllBlogs };
