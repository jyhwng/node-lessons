const mongoose = require('mongoose');
const nconf = require('nconf');

nconf
  .argv()
  .env()
  .file({ file: __dirname + '/config/secrets.json' });

mongoose
  .connect(
    `${nconf.get('db_adapter')}://${nconf.get('db_username')}:${nconf.get('db_password')}@${nconf.get(
      'db_host'
    )}/${nconf.get('db_name')}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .catch((e) => console.error(e));

module.exports = mongoose;
