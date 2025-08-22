import express from 'express';
import { createSale, getSales } from '../controllers/saleController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Registrar una venta
router.post('/', authMiddleware, createSale);

// Listar ventas
router.get('/', authMiddleware, getSales);

export default router;
