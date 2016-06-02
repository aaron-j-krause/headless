const fs = require('fs');

module.exports = exports = {};

exports.writeTextFile = function(path, content, cb) {
  writeFile(path, content, cb)
};

function writeFile(path, content, cb) {
  fs.writeFile(path, content, (err, data) => {
    if (err) throw err;
    cb && cb(data);
  });
}
