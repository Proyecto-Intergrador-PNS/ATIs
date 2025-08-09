import express from 'express';
import { login } from '../controllers/AuthController.js';

/**
 * @file auth.js
 * @description This file defines the API routes related to user authentication.
 * It sets up the endpoints and maps them to the corresponding controller functions.
 */

// Create a new Express router instance.
const router = express.Router();

/**
 * Defines the POST route for user login.
 *
 * - **Path:** `/login`
 * - **Method:** `POST`
 * - **Handler:** The `login` function imported from `AuthController.js`.
 * This route receives user credentials and handles the authentication logic.
 */
router.post('/login', login);

export default router;