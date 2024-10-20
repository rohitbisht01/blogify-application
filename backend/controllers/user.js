const User = require("../models/user");
const Blog = require("../models/blog");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with email already exists",
      });
    }

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
    });

    // Remove the password before sending the response
    const { password: _, ...safeUser } = newUser._doc;

    res.status(201).json({
      success: true,
      message: "User created",
      safeUser,
    });
  } catch (error) {
    console.log("Error registering user", error);
    res.status(500).json({
      success: false,
      message: "Error registering user",
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User doesn't exists. Please register the user",
      });
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(400).json({
        success: false,
        message: "Incorrect details",
      });
    }

    // Remove the password before sending the response
    const { password: _, ...safeUser } = user._doc;

    // generate token and store it in cookies
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
      })
      .json({
        success: true,
        message: "Logged in successfully",
        user: safeUser,
        token,
      });
  } catch (error) {
    console.log("Error while logging", error);
    res.status(500).json({
      success: false,
      message: "Error logging in",
    });
  }
};

const userLogout = async (req, res) => {
  try {
    return res.clearCookie("token").json({
      success: true,
      message: "successfully logged out",
    });
  } catch (error) {
    console.log("Error when logging out", error);
    res.status(500).json({
      success: false,
      message: "Error logging out",
    });
  }
};

// const profile = async (req, res) => {
//   try {
//     const { token } = req.cookies;

//     const decodedToken = jwt.decode(token, process.env.JWT_SECRET);
//     req.user = decodedToken;
//     console.log("decoded", decodedToken);

//     res.status(200).json({
//       success: true,
//       user: decodedToken,
//     });
//   } catch (error) {
//     console.log("Error getting current user", error);
//     res.status(400).json({
//       success: false,
//       message: "Error getting profile user",
//     });
//   }
// };

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  // console.log("req.headers", req.headers);

  // const tokenFromCookie = req.cookies.token;
  // console.log("tokenFromCookie", tokenFromCookie);
  // console.log(authHeader);

  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorized user",
    });

  // if (!tokenFromCookie)
  //   return res.status(401).json({
  //     success: false,
  //     message: "Unauthorized user",
  //   });

  try {
    // decode the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    // const decodedToken = jwt.verify(tokenFromCookie, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Unauthorized user",
    });
  }
};

const getBlogsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Fields are missing",
      });
    }

    const blogs = await Blog.find({ author: userId }).populate(
      "author",
      "username email"
    );

    res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    console.error("Error getting blogs: ", error);
    return res.status(401).json({
      success: false,
      message: "Error getting blogs",
    });
  }
};

module.exports = {
  registerUser,
  userLogin,
  userLogout,
  // profile,
  authMiddleware,
  getBlogsByUser,
};
