/**
 * MongoDB connection module
 * This module handles the connection to MongoDB using Mongoose
 */
const mongoose = require("mongoose");
const dotEnv = require("dotenv");
const {
  ENV_VARIABLE_NOT_AVAILABLE,
  MONGODB_SUCCESS,
  MONGODB_ERROR,
} = require("../constant/message");

// Load environment variables from .env file
dotEnv.config({
  path: ".env",
});

// Get MongoDB connection string from environment variables
const mongoURI = process.env.MONGODB;

/**
 * Establishes connection to MongoDB database
 * @returns {void}
 */
const connectToDatabase = () => {
  // Check if MongoDB URI is defined in environment variables
  if (!mongoURI) {
    console.error(ENV_VARIABLE_NOT_AVAILABLE);
  }

  // Attempt to connect to MongoDB with specified options
  mongoose
    .connect(mongoURI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds when selecting a server
      socketTimeoutMS: 45000, // Timeout after 45 seconds for socket operations
    })
    .then(() => console.log(MONGODB_SUCCESS)) // Log success message on successful connection
    .catch((error) => {
      // Handle connection errors
      console.error(MONGODB_ERROR, error);
      if (error && error.cause) {
        console.error("Cause:", error.cause); // Log the cause of the error if available
      }
    });
};

module.exports = connectToDatabase;
