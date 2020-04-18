const usersRouter = require('./users/users.router');
const sessionsRouter = require('./sessions/sessions.router');

module.exports = (app) => {
  app.use('/users', usersRouter(app));
  app.use('/sessions', sessionsRouter(app));
};
