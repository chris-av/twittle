const fs = require('fs');
const path = require('path');

module.exports = function() {
  fs.readFile(path.join(__dirname, '..', 'help.txt'), function(err, data) {
    if (err) throw err;
    const readme = data.toString();
    console.log(readme);
  });
}
