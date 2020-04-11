const express = require('express');
const axios = require('axios');

const dataLogger = require('./libraries/dataLogger');
const fileLogger = require('./libraries/fileLogger');

const app = express();
const port = 3001;

const getJobs = (params) => {
  const baseUrl = 'https://jobs.github.com/positions.json';

  return axios
    .get(baseUrl, { params })
    .then((response) => response.data)
    .catch((err) => console.error(err));
};

app.use('/', fileLogger);

app.get('/', (req, res) => {
  getJobs(req.query)
    .then((data) => dataLogger.saveToFile(JSON.stringify(data), 'userdata/data.json'))
    .then((response) => res.send(response))
    .catch((err) => console.error(err));
});

app.listen(port, () => console.log(`Listening to localhost:${port}`));
