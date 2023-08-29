import express from 'express';
import orderController from '../controllers/order.js';
import validator from '../validators/order.js';
const router = express.Router();

router.post('/', validator.validateOrder, orderController.createOrder);

export default router;
