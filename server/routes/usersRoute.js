const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    const newUser = new user(req.body);
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
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.send({
                message: "Invalid password",
                success: false,
            });
        }

        // Generate a token
        const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, { expiresIn: "1d" });
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

module.exports = router;