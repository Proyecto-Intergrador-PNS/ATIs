import mongoose, { modelNames } from "mongoose";


/**
 * @file User.js
 * @description This file defines the Mongoose schema and model for the User entity.
 * It outlines the structure, validation rules, and data types for user data
 * stored in the MongoDB database.
 */

/**
 * Mongoose schema for the User model.
 *
 * This schema defines the structure for user documents with the following fields:
 * - `name`: The user's full name. It is an optional string.
 * - `email`: The user's email address. It is required and must be unique.
 * - `password`: The user's password. It is a required field and will be stored as a hashed string.
 * - `address`: The user's physical address. It is an optional string.
 * - `role`: The user's role. It is an enum with a default value of "customer" and can only be "admin" or "customer".
 */
const userSchema = new mongoose.Schema({
  name: {type: String},
  email: {type: String, require: true, unique: true},
  password: {type: String, require: true},
  address: {type: String},
  role: {type: String, enum:["admin", "customer"] ,default: "customer"}
})

/**
 * Mongoose model for the User schema.
 *
 * This model provides an interface for interacting with the "users" collection in the database,
 * allowing for CRUD (Create, Read, Update, Delete) operations on user documents.
 */
const User = mongoose.model("User", userSchema);
export default User;