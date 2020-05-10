module.exports = (app, headers, context) => {
  const authorization = headers['Authorization'] || headers['authorization'];
  const jwtManager = app.get('jwtManager');

  if (!authorization) throw { name: 'TokenNotFound', message: 'Token not found' };

  try {
    const token = authorization.split('Bearer ')[1];
    payload = jwtManager.verify(token);
    context.id = payload.sub;
  } catch (e) {
    console.error(e);
    throw { name: 'TokenInvalid', message: 'Token is invalid' };
  }
};
