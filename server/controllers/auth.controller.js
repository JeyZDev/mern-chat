const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const node_mode = process.env.NODE_MODE;

const signUp = async (req, res) => {
  const { fullName, email, password, confirmPassword, profilePic } = req.body;
  if (!fullName || !email || !password || !confirmPassword) {
    return res.status(400).send({ message: "All fields is required!" });
  }

  if (password !== confirmPassword) {
    return res.status(400).send({ message: "Password don't match." });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).send({
      message: "Email is already used.",
    });
  }

  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      profilePic,
    });

    if (newUser) {
      const token = jwt.sign({ email, id: newUser._id }, JWT_SECRET, {
        expiresIn: "1d",
      });

      res.cookie("jwt", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: node_mode === "production",
      });
    }

    res.status(201).send({
      message: "User registered successfully.",
    });
  } catch (e) {
    res.status(500).send({
      message: e.message || "Something occurred while registering a new user",
    });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({
      message: "email or password are missing, please provide all fields.",
    });
  }
  try {
    const userDoc = await User.findOne({ email });
    if (!userDoc) {
      return res.status(404).send({
        message: "User not found.",
      });
    }
    const isPasswordMatched = await bcrypt.compare(password, userDoc.password);

    if (!isPasswordMatched) {
      return res.status(401).send({
        message: "Invalid credentials.",
      });
    }

    jwt.sign({ email, id: userDoc._id }, JWT_SECRET, {}, (err, token) => {
      if (err) {
        return res.status(500).send({
          message: "Internal Serve Error: Authentication failed!" || e.message,
        });
      }

      return res.send({
        message: "Logged in successfully",
        id: userDoc._id,
        username: userDoc.username,
        accessToken: token,
      });
    });
  } catch (e) {
    res.status(500).send({
      message: e.message || "Something occurred while registering a new user",
    });
  }
};

const AuthController = {
  signUp,
  signIn,
};

module.exports = AuthController;
