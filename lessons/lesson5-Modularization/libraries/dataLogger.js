const fs = require('fs');
const path = require('path');

const dataLogger = {
  /**
   * Save input data to file.
   *
   * @param {string} data
   * @return {Promise}
   */
  saveToFile: (data, subPath) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(path.resolve(__dirname, '../', subPath), data, (err) => {
        if (err) reject(err);
        resolve(data);
        console.log('Data is saved!');
      });
    });
  },
};

module.exports = dataLogger;
