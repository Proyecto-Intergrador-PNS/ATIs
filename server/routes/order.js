import express from 'express';
import { createOrder, getOrders } from '../controllers/orderController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Registrar una nueva orden (compra de producto)
router.post('/', authMiddleware, createOrder);

// Listar todas las órdenes
router.get('/', authMiddleware, getOrders);

export default router;
