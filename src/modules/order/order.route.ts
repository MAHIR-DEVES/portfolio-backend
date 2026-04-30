import express from 'express';
import {
  createOrder,
  getOrders,
  getOrderById,
  deleteOrder,
  updateOrder,
} from './order.controller';

const router = express.Router();

router.post('/orders', createOrder);
router.get('/orders', getOrders);
router.get('/orders/:id', getOrderById);
router.patch('/orders/:id', updateOrder);
router.delete('/orders/:id', deleteOrder);

export const OrderRoutes = router;
