const express = require('express');
const router = express.Router();
const loginValidation = require('./middlewares/login.validation');

module.exports = (app) => {
  router.post('/', loginValidation);

  router.post('/', (req, res) => {
    const jwtManager = app.get('jwtManager');
    const token = jwtManager.createToken(req.context.user.id);
    res.set('Authorization', `Bearer ${token}`);
    return res.json({ data: req.context.user });
  });

  return router;
};
