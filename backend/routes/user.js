const express = require("express");
const {
  registerUser,
  userLogin,
  userLogout,
  profile,
} = require("../controllers/user");
const router = express.Router();

router.get("/profile", profile);
router.post("/register", registerUser);
router.post("/login", userLogin);
router.get("/logout", userLogout);

module.exports = router;
