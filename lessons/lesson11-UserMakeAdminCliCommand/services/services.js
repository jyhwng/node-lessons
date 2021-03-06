const jobRequests = require('./randomjobs/randomjobs')
const sessionsRouter = require('./sessions/sessions.router')
const usersRouter = require('./users/users.router')

module.exports = (http, app) => {
  jobRequests(http);
  app.use('/sessions', sessionsRouter(app));
  app.use('/users', usersRouter(app));
};
