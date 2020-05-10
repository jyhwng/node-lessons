const validator = require('validator');

module.exports = async (req, res, next) => {
  let errors = [];

  const { username, email, password } = req.body;
  const UserModel = req.app.get('usersModel');

  // Check whether there is the `username` property
  if (!username) errors.push('Username is empty');
  // Check whether it is a string and a valid username
  else if (!(typeof username === 'string')) errors.push('Username is invalid');
  else {
    // Check whether the username has already been taken
    const user = await UserModel.findOne({ username });
    if (user) errors.push('Username already taken');
  }

  // Check whether there is the `email` property
  if (!email) errors.push('Email is empty');
  else if (!validator.isEmail(email)) errors.push('Email is invalid');
  else {
    const user = await UserModel.findOne({ email });
    if (user) errors.push('Email already taken');
  }

  // Check whether there is the `password` property
  if (!password) errors.push('Password is empty');
  else if (password.length < 8) {
    errors.push('Password is invalid');
  }

  if (errors.length > 0) {
    // Check whether it is valid
    return res.status(422).json({ hasError: 1, error: errors.join(', ') });
  }
  next();
};
