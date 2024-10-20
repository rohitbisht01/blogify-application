const express = require("express");
const {
  registerUser,
  userLogin,
  userLogout,
  authMiddleware,
  getBlogsByUser,
} = require("../controllers/user");
const router = express.Router();

// router.get("/profile", profile);
router.get("/profile", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "User is authenticated",
    user,
  });
});

router.get("/blogs/:userId", getBlogsByUser);
router.post("/register", registerUser);
router.post("/login", userLogin);
router.get("/logout", userLogout);

module.exports = router;
