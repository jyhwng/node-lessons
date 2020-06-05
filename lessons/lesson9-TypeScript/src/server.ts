import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import nconf from 'nconf';

import dataLogger from './libraries/dataLogger';
import fileLogger from './libraries/fileLogger';
import mongoose from './mongoose';
import JWTManager from './libraries/jwtManager';
import models from './models';
import services from './services';

const app = express();
const port = 3001;

nconf.argv().env().file({ file: './config/secrets.json' });

const getJobs = (params: any) => {
  const baseUrl = 'https://jobs.github.com/positions.json';

  return axios
    .get(baseUrl, { params })
    .then((response) => response.data)
    .catch((err) => console.error(err));
};

/** Middlewares */
app.use(fileLogger);
app.use(bodyParser.urlencoded({ extended: true }));

/** DB */
app.set('mongooseClient', mongoose);
models(app);

/** Services */
services(app);
app.set('jwtManager', JWTManager());

app.get('/', (req, res) => {
  getJobs(req.query)
    .then((data) => dataLogger.saveToFile(JSON.stringify(data), 'userdata/data.json'))
    .then((response) => res.send(response))
    .catch((err) => console.error(err));
});

app.listen(port, () => console.log(`Listening to localhost:${port}`));
