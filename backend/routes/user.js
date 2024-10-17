const express = require("express");
const { registerUser, userLogin, userLogout } = require("../controllers/user");
const router = express.Router();

// router.get("/", (req, res) => {
//   console.log(req.cookies);
//   res.status(200).json({
//     message: "cookie checking",
//   });
// });

router.post("/register", registerUser);
router.post("/login", userLogin);
router.get("/logout", userLogout);

module.exports = router;
