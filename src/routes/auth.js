import { Router } from 'express';
import passport from '../middleware/auth';
import { Logger } from '../services/logger';

const router = Router();

router.post('/login', passport.authenticate('login'), function (req, res) {
  res.json({ msg: 'Welcome!', user: req.user });
});

router.post('/signup', (req, res, next) => {
  passport.authenticate('signup', function (err, user, info) {
    Logger.info(err, user, info);
    if (err) {
      return next(err);
    }
    if (!user) return res.status(401).json({ data: info });

    res.json({ msg: 'signup OK' });
  })(req, res, next);
});

export default router;