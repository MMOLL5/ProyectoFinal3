import { Router } from 'express';
import { cartController } from '../controllers/cart';
import { checkAdmin } from '../middleware/admin';
import asyncHandler from 'express-async-handler';

const router = Router();

router.get('/', asyncHandler(cartController.getProducts));

router.get(
  '/:id',
  //cartController.checkCartExists,
  asyncHandler(cartController.getProducts)
);

router.post(
  '/',
  cartController.checkAddProductCart,
  asyncHandler(cartController.addProductCart)
);

router.delete(
  '/:id',
  cartController.checkCartExists,
  asyncHandler(cartController.deleteProductCart)
);

export default router;