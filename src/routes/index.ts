import express from 'express';
import { AuthRoutes } from '../app/modules/auth/auth.route';
import { CategoryRoutes } from '../app/modules/category/category.route';
import { ProductRoutes } from '../app/modules/product/product.route';
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
  {
    path: '/product',
    route: ProductRoutes,
  },
];

apiRoutes.forEach(route => router.use(route.path, route.route));

export default router;
