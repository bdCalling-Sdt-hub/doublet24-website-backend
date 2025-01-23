import express, { NextFunction, Request, Response } from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import { ProductController } from './product.controller';
import { ProductValidation } from './product.validation';
const router = express.Router();

router.post(
  '/create-product',
  auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
  fileUploadHandler(),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = ProductValidation.createProductZodSchema.parse(
      JSON.parse(req.body.data)
    );
    return ProductController.createProduct(req, res, next);
  }
);

export const ProductRoutes = router;
