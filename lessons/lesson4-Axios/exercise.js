const express = require('express');
const axios = require('axios');
const fs = require('fs');
const winston = require('winston');
const moment = require('moment');

const app = express();
const port = 3001;

const getJobs = (params) => {
  const baseUrl = 'https://jobs.github.com/positions.json';

  return axios
    .get(baseUrl, { params })
    .then((response) => response.data)
    .catch((err) => console.error(err));
};

const saveToFile = (data, path) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(__dirname + path, data, (err) => {
      if (err) reject(err);
      resolve(data);
      console.log('Data is saved!');
    });
  });
};

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: __dirname + '/storage/logs/nodeJobs.log',
    }),
  ],
});

app.use('/', (req, _, next) => {
  logger.log({
    url: req.url,
    method: req.method,
    timestamp: moment.now(),
  });
  next();
});

app.get('/', (req, res) => {
  getJobs(req.query)
    .then((data) => saveToFile(data, '/userdata/data.json'))
    .then((response) => res.send(response))
    .catch((err) => console.error(err));
});

app.listen(port, () => console.log(`Listening to localhost:${port}`));
