import express, { Express } from 'express';
const router = express.Router();
import loginValidation from './middlewares/login.validation';
import tokenInvalidation from './middlewares/token.invalidation';

export default (app: Express) => {
  router.post('/', loginValidation);

  router.post('/', (req, res) => {
    const jwtManager = app.get('jwtManager');
    const token = jwtManager.createToken(req.context.id);

    res.set('Authorization', `Bearer ${token}`);
    return res.json({ data: req.context.user });
  });

  /** Logout endpoint */
  router.delete('/', tokenInvalidation);
  router.delete('/', (req, res) => {
    return res.json({ message: 'Token successfully invalidated' }).status(200);
  });

  return router;
};
