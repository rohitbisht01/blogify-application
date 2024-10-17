const User = require("../models/user");
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

    res.status(201).json({
      success: true,
      message: "User created",
      newUser,
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

const profile = async (req, res) => {
  try {
    const { token } = req.cookies;

    const decodedToken = jwt.decode(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    console.log("decoded", decodedToken);

    res.status(200).json({
      success: true,
      user: decodedToken,
    });
  } catch (error) {
    console.log("Error getting current user", error);
    res.status(400).json({
      success: false,
      message: "Error getting profile user",
    });
  }
};

module.exports = { registerUser, userLogin, userLogout, profile };
