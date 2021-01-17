module.exports = function(seconds) {
  return new Promise((resolve, reject) => {
    console.log(`waiting ${seconds} seconds ... \n`);
    setTimeout(() => {
      resolve('');
    }, seconds * 1000)
  });
}