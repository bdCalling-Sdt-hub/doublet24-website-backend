import express from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { SubscriberController } from './subscriber.controller';
import { SubscriberValidation } from './subscriber.validation';
const router = express.Router();

router.post(
  '/replied/:id',
  auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
  validateRequest(SubscriberValidation.subscriberRepliedMessage),
  SubscriberController.subscriberRepliedMessage
);

router
  .route('/')
  .post(
    validateRequest(SubscriberValidation.subscriberCreateZodSchema),
    SubscriberController.createSubscriber
  )
  .get(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    SubscriberController.getSubscriberList
  );

export const SubscriberRoutes = router;
