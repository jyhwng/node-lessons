const express = require("express");
const axios = require("axios");
const fs = require("fs");

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
  }, "?");

const getJobs = (query) => {
  const apiEndpoint = `https://jobs.github.com/positions.json${getQueryParams(
    query
  )}`;

  return axios
    .get(apiEndpoint)
    .then((response) => response.data)
    .catch((err) => console.error(err));
};

const saveData = (data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(__dirname + "/userdata/data.json", data, (err) => {
      if (err) reject(err);
      resolve(data);
      console.log("Data is saved!");
    });
  });
};

app.get("/", (req, res) => {
  getJobs(req.query)
    .then(saveData)
    .then((response) => res.send(response))
    .catch((err) => console.error(err));
});

app.listen(port, () => console.log(`Listening to localhost:${port}`));
