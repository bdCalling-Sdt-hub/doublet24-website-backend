import express from 'express';
import { AboutRoutes } from '../app/modules/about/about.route';
import { AuthRoutes } from '../app/modules/auth/auth.route';
import { CategoryRoutes } from '../app/modules/category/category.route';
import { FaqRoutes } from '../app/modules/faq/faq.route';
import { OrderRoutes } from '../app/modules/order/order.route';
import { ProductRoutes } from '../app/modules/product/product.route';
import { RuleRoutes } from '../app/modules/rule/rule.route';
import { SubcategoryRoutes } from '../app/modules/subcategory/subcategory.route';
import { SubscriberRoutes } from '../app/modules/subscriber/subscriber.route';
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
  {
    path: '/order',
    route: OrderRoutes,
  },
  {
    path: '/faq',
    route: FaqRoutes,
  },
  {
    path: '/rule',
    route: RuleRoutes,
  },
  {
    path: '/about',
    route: AboutRoutes,
  },
  {
    path: '/subscriber',
    route: SubscriberRoutes,
  },
];

apiRoutes.forEach(route => router.use(route.path, route.route));

export default router;
