import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

/**
 * @file AuthController.js
 * @description Controlador para la lógica de autenticación de usuarios.
 * Contiene funciones para manejar el login de usuarios.
 */

/**
 * Maneja la lógica de inicio de sesión de un usuario.
 *
 * @async
 * @param {import('express').Request} req - El objeto de solicitud de Express. Se espera que contenga `email` y `password` en el cuerpo.
 * @param {import('express').Response} res - El objeto de respuesta de Express.
 * @returns {Promise<object>} Una promesa que resuelve con un objeto JSON indicando el éxito o el fracaso del login.
 *
 * @example
 * // En una solicitud POST a '/api/auth/login' con el siguiente cuerpo:
 * // {
 * //   "email": "user@example.com",
 * //   "password": "password123"
 * // }
 * // Si las credenciales son correctas, la respuesta será:
 * // {
 * //   "success": true,
 * //   "message": "Login successful",
 * //   "token": "...",
 * //   "user": { "id": "...", "name": "...", "email": "...", "role": "..." }
 * // }
 */
const login = async (req, res) => {
  try {
    // 1. Extraer email y password del cuerpo de la solicitud.
    const { email, password } = req.body;
    
    // 2. Buscar al usuario en la base de datos por su email.
    const user = await User.findOne({ email });

    // 3. Si el usuario no existe, enviar una respuesta de error.
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    // 4. Comparar la contraseña proporcionada con la contraseña hasheada almacenada.
    const isMatch = await bcrypt.compare(password, user.password);
    
    // 5. Si las contraseñas no coinciden, enviar una respuesta de error.
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // 6. Generar un JSON Web Token (JWT) con el ID y el rol del usuario.
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '90d' });

    // 7. Enviar una respuesta exitosa con el token y los datos del usuario.
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });

  } catch (error) {
    // 8. Enviar una respuesta de error del servidor en caso de excepción.
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { login };
