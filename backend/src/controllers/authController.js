import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const handleRegister = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newUser = new User({
      name,
      email,
      password,
    });
    await newUser.save();
    const token = generateToken(newUser._id);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        name: newUser.name,
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }

    if (existingUser.password != password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(existingUser._id);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        name: existingUser.name,
        email: existingUser.email,
      },
    });
  } catch (error) {
        res.status(500).json({ message: err.message });

  }
};

