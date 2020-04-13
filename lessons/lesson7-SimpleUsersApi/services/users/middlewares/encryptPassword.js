const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = async (req, res, next) => {
  let data = req.body;
  let errors = [];

  if (!data.password) {
    errors.push('The password is missing.');
  } else {
    data.password = await bcrypt.hash(data.password, saltRounds);
  }

  if (errors.length > 0) {
    return res.status(422).json({ hasError: 1, error: errors.toString() });
  }
  next();
};
