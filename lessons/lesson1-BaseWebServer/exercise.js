const express = require("express");
const axios = require("axios");
const fs = require("fs");

const app = express();
const port = 3001;

const getJobs = (fullTime, location) => {
  let queryParams = "?";

  if (location) queryParams += `&location=${location}`;
  if (fullTime) queryParams += `&full_time`;

  return axios
    .get(`https://jobs.github.com/positions.json${queryParams}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.error(err));
};

const saveData = (data) => {
  fs.writeFile(
    __dirname + "/userdata/data.json",
    JSON.stringify(data),
    (err) => {
      if (err) throw err;
      console.log("Data is saved!");
    }
  );
};

app.get("/", (req, res) => {
  const { full_time, location } = req.query;

  getJobs(full_time, location)
    .then((response) => {
      saveData(response);
      return res.send(response);
    })
    .catch((err) => console.error(err));
});

app.listen(port, () => console.log(`Listening to localhost:${port}`));
