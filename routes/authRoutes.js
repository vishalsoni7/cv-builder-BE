const express = require("express");
const userRouter = express.Router();
const {
  userLogin,
  userSignUp,
  getUserProfile,
} = require("../controllers/userController");
const { authMiddleware } = require("../middleware/authMiddleWare");

// Middleware to parse JSON request bodies
userRouter.use(express.json());

/**
 * @route   GET /me
 * @desc    Get user profile
 * @access  Private (requires token)
 */
userRouter.get("/me", authMiddleware, async (req, res) => {
  try {
    const userId = req.user?.userId; // Extracted from JWT token via authMiddleware
    const user = await getUserProfile(userId);

    res.status(200).json(user);
  } catch (error) {
    res
      .status(400)
      .json({ message: error.message || "Could not fetch user profile" });
  }
});

/**
 * @route   POST /login
 * @desc    Authenticate user and return user data
 * @access  Public
 */
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userLogin(email, password);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(401).json({ message: "Invalid credentials!" });
    }
  } catch (error) {
    res.status(401).json({ message: error.message || "Could not login" });
  }
});

/**
 * @route   POST /signup
 * @desc    Register a new user and return a token
 * @access  Public
 */
userRouter.post("/signup", async (req, res) => {
  try {
    const { token } = await userSignUp(req.body);

    if (token) {
      res.status(200).json({ token });
    } else {
      res.status(400).json({ message: "Please fill all details!" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Could not sign up", error: error.message });
  }
});

// Exporting the router module
module.exports = { userRouter };
