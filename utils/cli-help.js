const fs = require('fs');
const path = require('path');

module.exports = function() {
  fs.readFile(path.join(__dirname, '..', 'README.md'), function(err, data) {
    if (err) throw err;
    const readme = data.toString();
    console.log(readme);
  });
}
