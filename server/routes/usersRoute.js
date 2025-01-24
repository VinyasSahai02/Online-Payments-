const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

// Register a new user
router.post("/register", async (req, res) => {
  try {
    // Check if the user already exists
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.send({
        message: "User already exists",
        success: false,
      });
    }

    const salt = await bcrypt.genSalt(10); //salt rounds
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    const newUser = new User(req.body);
    await newUser.save();
    res.send({
      message: "User registered successfully",
      data: null,
      success: true,
    });
  } catch (err) {
    res.send({
      message: err.message,
      success: false,
    });
  }
});

// Login a user
router.post("/login", async (req, res) => {
    try {
      // Check if the user exists
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.send({
          message: "User dose not exist",
          success: false,
        });
      }

      // Check if the password is correct
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.send({
          message: "Invalid password",
          success: false,
        });
      }

      // Generate a token
      // { userId: user._id } means we are encrypting the user id
      const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {
        expiresIn: "1d",
      });
      res.send({
        message: "Login successful",
        data: token,
        success: true,
      });
    } catch (err) {
        res.send({
            message: err.message,
            success: false,
        });
    }
});

//get user info
router.post("/get-user-info", authMiddleware ,async (req, res) => {
  //before getting info from the token we need to decrypt the token
  // for this we runa middleware before try catch
  try {
    const user = await User.findById(req.body.userId);
    user.password =''
    res.send({
      message: "User info fetched successfully",
      data: user,
      success: true,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
    });
  }
})
module.exports = router;