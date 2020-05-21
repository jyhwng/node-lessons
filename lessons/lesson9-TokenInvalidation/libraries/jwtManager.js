const jwt = require('jsonwebtoken');
const nconf = require('nconf');

class JWTManager {
  constructor() {
    this.secretKey = nconf.get('app_key');
  }

  createToken(userId) {
    return jwt.sign({}, this.secretKey, { expiresIn: '4h', subject: userId.toString() });
  }

  verify(token) {
    try {
      return jwt.verify(token, this.secretKey);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = () => {
  return new JWTManager();
};
