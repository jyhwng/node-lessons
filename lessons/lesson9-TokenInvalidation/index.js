const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const nconf = require('nconf');

const dataLogger = require('./libraries/dataLogger');
const fileLogger = require('./libraries/fileLogger');
const mongoose = require('./mongoose');
const JWTManager = require('./libraries/jwtManager');
const models = require('./models');
const services = require('./services');

const app = express();
const port = 3001;

nconf
  .argv()
  .env()
  .file({ file: __dirname + '/config/secrets.json' });

const getJobs = (params) => {
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
