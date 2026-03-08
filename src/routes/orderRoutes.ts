import { Router } from 'express';
import { OrderController } from '../controllers/OrderController.js';
import { AuthController } from '../controllers/AuthController.js';
import { authMiddleware } from '../middlewares/AuthMiddleware.js';

const router = Router();
const orderController = new OrderController();
const authController = new AuthController();
router.post('/login', authController.login);
router.post('/register', authController.register);

router.use(authMiddleware);
router.post('/order', orderController.create);
router.get('/order/:id', orderController.getById);
router.get('/order', orderController.listAll);
router.put('/order/:id', orderController.update);
router.delete('/order/:id', orderController.remove);

export default router;