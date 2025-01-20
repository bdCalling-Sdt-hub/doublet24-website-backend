import express from 'express';
import { AuthRoutes } from '../app/modules/auth/auth.route';
import { CategoryRoutes } from '../app/modules/category/category.route';
import { SubcategoryRoutes } from '../app/modules/subcategory/subcategory.route';
import { UserRoutes } from '../app/modules/user/user.route';
const router = express.Router();

const apiRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/category',
    route: CategoryRoutes,
  },
  {
    path: '/subcategory',
    route: SubcategoryRoutes,
  },
];

apiRoutes.forEach(route => router.use(route.path, route.route));

export default router;
