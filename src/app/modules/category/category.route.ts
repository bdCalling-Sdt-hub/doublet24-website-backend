import express, { NextFunction, Request, Response } from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import { CategoryController } from './category.controller';
import { CategoryValidation } from './category.validation';
const router = express.Router();

router.post(
  '/create-category',
  auth(USER_ROLES.SUPER_ADMIN),
  fileUploadHandler(),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = CategoryValidation.createCategoryZodSchema.parse(
      JSON.parse(req.body.data)
    );
    return CategoryController.createCategory(req, res, next);
  }
);

router
  .route('/:id')
  .get(CategoryController.getSingleCategory)
  .patch(
    auth(USER_ROLES.SUPER_ADMIN),
    fileUploadHandler(),
    (req: Request, res: Response, next: NextFunction) => {
      if (req.body.data) {
        req.body = CategoryValidation.updateCategoryZodSchema.parse(
          JSON.parse(req.body.data)
        );
      }
      return CategoryController.updateCategory(req, res, next);
    }
  )
  .delete(CategoryController.deleteCategory);

router.get('/', CategoryController.getAllCategory);

export const CategoryRoutes = router;
