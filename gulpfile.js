var gulp = require('gulp');
var fs = require('fs');
var localSharedDataFilePath = 'sharedData.js';


function dynamicConfig(path, mock) {
  return new Promise(function (resolve, reject) {
    let config;
    if (mock) {
      config = {
        port: 3000
      }
    } else {
      config = {
        port: Number(process.env.PORT)
      };
    }

    const data = 'const sharedDataConfig = ' + formatKeys(config) + ';\n';
    if (!mock) {
        writeFile(path, data, resolve, reject);
    } else {
      writeFile(path, data, resolve, reject);
      console.log('existing sharedData.js file overridden.');
    }
  });
}

function deleteFile(path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err) => {
      if (err) reject(err);
      fs.unlink(path, (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  });
}

function writeFile(path, data, resolve, reject) {
  fs.writeFile(path, data, (err) => {
    if (err) reject(err);
    resolve();
  });
}

function formatKeys(configObj) {
  return JSON.stringify(configObj).replace(/"/g, "").replace(/:/g, ": ").replace(/,/g, ", ");
}

gulp.task('genSharedData', (done) => {
  dynamicConfig('server/dist/client/sharedData.js', false).then(() => {
    console.log("'sharedData.js' file generated!");
    done();
  }).catch((err) => {
    console.log('gulp task err: ', err);
  });
});

gulp.task('deleteLocalSharedData', (done) => {
  deleteFile(localSharedDataFilePath).then(() => {
    console.log('existing sharedData.js file deleted!');
    done();
  }).catch((err) => {
    console.log('gulp task err: ', err);
    if (err.code === 'ENOENT') {
      console.log('file doesn\'t exist in the project.');
      done();
    }
  });
});

gulp.task('genMockSharedData', (done) => {
  dynamicConfig('sharedData.js', true).then(() => {
    console.log("'mock sharedData.js' file generated!");
    done();
  }).catch((err) => {
    console.log('gulp task err: ', err);
  });
});
