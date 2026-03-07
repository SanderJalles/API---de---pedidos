import { Router } from 'express';
import { OrderController } from '../controllers/OrderController.js';

const router = Router();
const orderController = new OrderController();

// POST http://localhost:3000/order [cite: 227]
router.post('/', orderController.create);

// GET http://localhost:3000/order/v10089016vdb [cite: 228]
router.get('/:id', orderController.getById);

export default router;