const validator = require('validator');

module.exports = async (req, res, next) => {
  let errors = [];

  const { username, email } = req.body;
  const UserModel = req.app.get('usersModel');
  if (!username) {
    // Check whether there is the `username` property
    errors.push('Username is empty');
  } else if (!(typeof username === 'string')) {
    // Check whether it is a string and a valid username
    errors.push('Username is invalid');
  } else {
    // Check whether the username has already been taken
    const user = await UserModel.findOne({ username });
    if (user) errors.push('Username already exist');
  }

  if (!email) {
    // Check whether there is the `email` property
    errors.push('Email is empty');
  } else if (!validator.isEmail(email)) {
    errors.push('Email is invalid');
  } else {
    // Check whether the email has already been taken
    const user = await UserModel.findOne({ email });
    if (user) errors.push('Email already taken');
  }

  if (errors.length > 0) {
    return res.status(422).json({ hasError: 1, error: errors.join(', ') });
  }

  next();
};
