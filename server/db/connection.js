import mongoose from "mongoose";

/**
 * @file connection.js
 * @description This file contains the function to connect to the MongoDB database.
 */

/**
 * Establishes a connection to the MongoDB database.
 *
 * This function uses Mongoose to connect to the database URI specified in the
 * `process.env.MONGO_URI` environment variable. It handles both successful
 * connection and potential errors.
 *
 * - On success, it logs a message to the console.
 * - On failure, it logs the error and exits the Node.js process with a status code of 1,
 * indicating that a fatal error occurred.
 *
 * @returns {Promise<void>} A promise that resolves when the connection is successful.
 */
const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB database using the URI from environment variables.
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    // Log the error message if the connection fails.
    console.error("MongoDB connection error:", error.message);
    
    // Exit the process with a failure code (1) to indicate a critical error.
    process.exit(1);
  }
};

export default connectDB;

