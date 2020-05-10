const express = require('express');
const router = express.Router();
const userValidateNew = require('./middlewares/users.validation.new');
const userValidateUpdate = require('./middlewares/users.validation.update');

const encryptPassword = require('./middlewares/encryptPassword');

module.exports = (app) => {
  const Users = app.get('usersModel');

  router.get('/', async (_, res) => {
    await Users.find((err, users) => {
      if (err) {
        return res.status(500).json({ hasError: 1, error: err });
      }
      return res.json(users);
    });
  });

  router.post('/', userValidateNew);
  router.post('/', encryptPassword);
  router.post('/', async (req, res) => {
    const { email, username, password } = req.body;

    await Users.create({ email, username, password }, (err, user) => {
      if (err) {
        return res.status(500).json({ hasError: 1, error: err });
      }
      return res.json(user);
    });
  });

  router.put('/:id', userValidateUpdate);
  router.put('/:id', async (req, res) => {
    const { email, username } = req.body;

    await Users.findOneAndUpdate({ _id: req.params.id }, { email, username }, (err, user) => {
      if (!user) {
        return res.status(404).json({ hasError: 1, error: 'User Not Found' });
      }
      if (err) {
        return res.status(500).json({ hasError: 1, error: err });
      }
      return res.json(user);
    });
  });

  return router;
};
