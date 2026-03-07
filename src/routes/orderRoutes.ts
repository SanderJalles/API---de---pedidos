import { Router } from 'express';
import { OrderController } from '../controllers/OrderController.js';

const router = Router();
const orderController = new OrderController();

router.post('/', orderController.create);

router.get('/:id', orderController.getById);

router.get('/', orderController.listAll);

router.put('/:id', orderController.update);

router.delete('/:id', orderController.remove);

export default router;