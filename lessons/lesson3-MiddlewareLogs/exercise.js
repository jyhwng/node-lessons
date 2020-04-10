const express = require('express');
const axios = require('axios');
const fs = require('fs');
const winston = require('winston');
const moment = require('moment');

const app = express();
const port = 3001;

const getQueryParams = (query) =>
  Object.entries(query).reduce((prev, [key, value], currIdx) => {
    if (currIdx === 0) {
      prev += `${key}=${value}`;
    } else {
      prev += `&${key}=${value}`;
    }
    return prev;
  }, '?');

const getJobs = (query) => {
  const apiEndpoint = `https://jobs.github.com/positions.json${getQueryParams(
    query
  )}`;

  return axios
    .get(apiEndpoint)
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
    method: req.method,
    url: req.url,
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
