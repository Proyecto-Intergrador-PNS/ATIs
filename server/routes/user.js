import express from 'express';
import { getUsers, createUser, updateUser, deleteUser } from '../controllers/UserController.js';
import { verifyToken, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();


// GET, PUT, DELETE requieren admin, pero POST (crear usuario) es pública
router.get('/', getUsers);
router.post('/', createUser);
router.put('/:id', verifyToken, isAdmin, updateUser);
router.delete('/:id', verifyToken, isAdmin, deleteUser);

export default router;
