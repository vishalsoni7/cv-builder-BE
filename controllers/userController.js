const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const JWT_SECRET = process.env.JWT_SECRET;
const UserSchema = require("../models/User");
const {
  USER_ID_MISSING,
  USER_NOT_FOUND,
  EMAIL_PASSWORD_REQUIRED,
  INVALID_CREDENTIALS,
  TOKEN_EXPIRE_TIME,
  requiredFields,
  MISSING_DETAILS,
} = require("../constant/message");

/**
 * getUserProfile - Retrieves a user's profile information from the database, excluding the password
 */
const getUserProfile = async (userId) => {
  if (!userId) {
    throw new Error(USER_ID_MISSING);
  }

  try {
    const user = await UserSchema.findById(userId).select("-password");

    if (!user) {
      throw new Error(USER_NOT_FOUND);
    }

    return user;
  } catch (error) {
    console.error(`Profile fetch error: ${error.message}`);
    throw error;
  }
};

/**
 * userLogin - Authenticates a user with email and password, returns JWT token upon successful login
 */
const userLogin = async (email, password) => {
  if (!email || !password) {
    throw new Error(EMAIL_PASSWORD_REQUIRED);
  }

  try {
    const user = await UserSchema.findOne({ email });

    if (!user) {
      throw new Error(USER_NOT_FOUND);
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error(INVALID_CREDENTIALS);
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        resumes: user.resumes,
      },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRE_TIME } // Token expires in 24 hour
    );

    return { token };
  } catch (error) {
    console.error(`Login error: ${error.message}`);
    throw error;
  }
};

/**
 * userSignUp - Creates a new user account with provided details and returns JWT token
 */
const userSignUp = async (userDetails) => {
  const missingDetails = requiredFields.filter((field) => !userDetails[field]);

  if (missingDetails.length > 0) {
    console.error(`${MISSING_DETAILS}: ${missingDetails.join(", ")}`);
    throw new Error(`${MISSING_DETAILS}: ${missingDetails.join(", ")}`);
  }

  try {
    const existingUser = await UserSchema.findOne({ email: userDetails.email });

    if (existingUser) {
      throw new Error(`User with ${userDetails.email} email already exists`);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(userDetails.password, 10);

    // Create new user
    const newUser = new UserSchema({
      ...userDetails,
      password: hashedPassword,
      resumes: [],
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: newUser._id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        resumes: newUser.resumes,
      },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRE_TIME } // Token expires in 24 hour
    );

    return { token };
  } catch (error) {
    console.error(`Registration error: ${error.message}`);
    throw error;
  }
};

module.exports = {
  userLogin,
  userSignUp,
  getUserProfile,
};
