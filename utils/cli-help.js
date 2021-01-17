const fs = require('fs');
const path = require('path');

module.exports = function() {
  // fs.readFile(__dirname + '/package.json', function(err, data) {
  //   if (err) throw err;
  //   const package = JSON.parse(data);
  //   // console.log(`for help, see the GitHub page at : ${package}`);
  //   console.log(package);
  // });
  fs.readFile(path.join(__dirname, '..', 'package.json'), function(err, data) {
    if (err) throw err;
    const package = JSON.parse(data);
    console.log(`for help, see the GitHub page at : ${package.version}`);
    console.log(package);
  });
}