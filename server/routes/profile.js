
import express from 'express';
import { getProfile, updateProfile } from '../controllers/ProfileController.js';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

// Obtener perfil del usuario autenticado
router.get('/', verifyToken, getProfile);

// Actualizar perfil del usuario autenticado
router.put('/', verifyToken, updateProfile);

export default router;
