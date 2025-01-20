import express, { NextFunction, Request, Response } from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import { SubcategoryController } from './subcategory.controller';
import { SubcategoryValidation } from './subcategory.validation';
const router = express.Router();

router.post(
  '/create-subcategory',
  auth(USER_ROLES.SUPER_ADMIN),
  fileUploadHandler(),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = SubcategoryValidation.createSubcategoryZodSchema.parse(
      JSON.parse(req.body.data)
    );
    return SubcategoryController.createSubcategory(req, res, next);
  }
);

router
  .route('/:id')
  .get(SubcategoryController.getSingleSubcategory)
  .patch(
    auth(USER_ROLES.SUPER_ADMIN),
    fileUploadHandler(),
    (req: Request, res: Response, next: NextFunction) => {
      if (req.body.data) {
        req.body = SubcategoryValidation.updateSubcategoryZodSchema.parse(
          JSON.parse(req.body.data)
        );
      }
      return SubcategoryController.updateSubcategory(req, res, next);
    }
  )
  .delete(SubcategoryController.deleteSubcategory);

router.get('/', SubcategoryController.getAllSubcategory);

export const SubcategoryRoutes = router;
