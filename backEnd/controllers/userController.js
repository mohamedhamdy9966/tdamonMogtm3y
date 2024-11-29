import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Utility to create JWT
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// // Helper function to find user by email or mobile
// const findUser = async (email, mobile) => {
//   if (email) return userModel.findOne({ email });
//   if (mobile) return userModel.findOne({ mobile });
//   return null;
// };

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({email});

    // Validate input
    if (!email) {
      return res.status(400).json({ success: false, message: "Email or Mobile is required" });
    }
    if (!password) {
      return res.status(400).json({ success: false, message: "Password is required" });
    }

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id);
      res.status(200).json({ success: true, token });
    } else {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Register User
const registerUser = async (req, res) => {
  try {
    const { name, mobile, email, password } = req.body;

    const exists = await userModel.findOne({email});
    if (exists) {
      return res.json({success:false, message:"User already exist"})
    }

    // Validate input
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    if (password.length <= 10) {
      return res.status(400).json({ success: false, message: "Password must be more than 10 characters" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save the user
    const newUser = new userModel({
      name,
      mobile,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();

    // Generate token
    const token = createToken(user._id);
    res.status(201).json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Admin Login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Compare password with hash stored in the environment
    const isMatch = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Generate a token
        const payload = { email: process.env.ADMIN_EMAIL };    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });
        res.status(200).json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { loginUser, registerUser, adminLogin };