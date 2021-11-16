import { Router } from 'express';
import productsRouter from './products';
import cartRouter from './cart';
import { isLoggedIn } from '../middleware/auth';
import UserRouter from './user';
import AuthRouter from './auth';

const router = Router();

router.use('/products', productsRouter);
router.use('/cart', cartRouter);
router.use('/auth', AuthRouter);

router.get('/hello', (req, res) => {
  res.json({ msg: 'HOLA', session: req.session });
});

router.use('/user', isLoggedIn, UserRouter);

export default router;