import mongoose from 'mongoose';
import nconf from 'nconf';

nconf.argv().env().file({ file: './config/secrets.json' });

mongoose
  .connect(
    `${nconf.get('db_adapter')}://${nconf.get('db_username')}:${nconf.get(
      'db_password'
    )}@${nconf.get('db_host')}/${nconf.get('db_name')}?retryWrites=true&w=majority`,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .catch((e) => {
    console.log(e);
  });

export default mongoose;
