import express from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OrderController } from './order.controller';
import { OrderValidation } from './order.validation';
const router = express.Router();

router.get(
  '/overview',
  auth(USER_ROLES.SUPER_ADMIN),
  OrderController.getOrderOverview
);

router
  .route('/:id')
  .patch(auth(USER_ROLES.SUPER_ADMIN), OrderController.updateOrderStatus);

router
  .route('/')
  .post(
    validateRequest(OrderValidation.createOrderValidation),
    OrderController.createOrder
  )
  .get(auth(USER_ROLES.SUPER_ADMIN), OrderController.getAllOrders);

export const OrderRoutes = router;
