import fs from 'fs';
import path from 'path';

const dataLogger = {
  /**
   * Save input data to file.
   *
   * @param {string} data
   * @return {Promise}
   */
  saveToFile: (data: any, subPath: string) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(path.resolve(__dirname, '../', subPath), data, (err) => {
        if (err) reject(err);
        resolve(data);
        console.log('Data is saved!');
      });
    });
  },
};

export default dataLogger;
