import express, { NextFunction, Request, Response } from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import { AboutController } from './about.controller';
import { AboutValidation } from './about.validation';
const router = express.Router();

router.post(
  '/create-content',
  auth(USER_ROLES.SUPER_ADMIN),
  fileUploadHandler(),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = AboutValidation.createAboutZodSchema.parse(
      JSON.parse(req.body.data)
    );
    return AboutController.createAboutContent(req, res, next);
  }
);

router
  .route('/:id')
  .patch(
    auth(USER_ROLES.SUPER_ADMIN),
    fileUploadHandler(),
    (req: Request, res: Response, next: NextFunction) => {
      if (req.body.data) {
        req.body = AboutValidation.updateAboutZodSchema.parse(
          JSON.parse(req.body.data)
        );
      }
      return AboutController.updateAboutContent(req, res, next);
    }
  )
  .delete(AboutController.deleteAboutContent);

router.get('/', AboutController.getAllAboutContent);

export const AboutRoutes = router;
