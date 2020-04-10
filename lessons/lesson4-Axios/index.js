const express = require('express');
const app = express();
const axios = require('axios');
const fs = require('fs');
const moment = require('moment');

const winston = require('winston');
winston.add(winston.transports.File, { filename: 'storage/logs/nodeJobs.log' });
winston.remove(winston.transports.Console);

/**
 * Get allowed query parameters and return them in an object.
 *
 * @param {object} query
 * @param {array} allowedNames
 * @return {object}
 */
const getQueryParameters = (query, allowedNames) => {
  let queryObject = {};

  for (const queryName in query) {
    if (allowedNames.includes(queryName)) {
      queryObject[queryName] = query[queryName];
    }
  }

  return queryObject;
};

/**
 * Save input data to file.
 *
 * @param {string} data
 * @return {Promise}
 */
const saveToFile = (data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(__dirname + '/userdata/data.json', data, (err) => {
      if (err) return reject();
      resolve(data);
    });
  })
};

const retrieveJobs = (req, res) => {
  const baseUrl = 'https://jobs.github.com/positions.json';
  let data;

  axios.get(baseUrl, { params: getQueryParameters(req.query, ['location', 'full_time']) })
    .then(response => { return data = response.data })
    .then(() => { return saveToFile(JSON.stringify(data)) })
    .then(() => res.json(data))
    .catch(e => {
      console.error('ERROR');
      console.error(e);
    });
};

/**
 * Middleware which logs to file.
 */
app.use((req, res, next) => {
  winston.info(`${moment().format('YYYY-MM-DD HH:mm:SS')}: Incoming ${req.method} request at ${req.url}`);
  next();
});

app.get('/', retrieveJobs);

app.listen(3000, () => console.log('App listening on port 3000!'));
