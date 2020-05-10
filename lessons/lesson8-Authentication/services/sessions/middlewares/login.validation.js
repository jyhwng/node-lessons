const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
  const { email, password } = req.body;
  const UserModel = req.app.get('usersModel');

  if (!req.context) {
    req.context = {};
  }

  if (!email || !password) {
    return res.status(422).json({ hasError: 1, error: 'Email or password is not given' });
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(401).json({ hasError: 1, error: 'User Not Found' });
  }

  const verified = await bcrypt.compare(password, user.password);

  if (!verified) {
    return res.status(401).json({ hasError: 1, error: 'Login failed' });
  }

  req.context.id = user._id;
  req.context.user = {
    _id: user._id,
    email: user.email,
    username: user.username,
    admin: user.admin || false,
  };

  next();
};
