module.exports = function(filename) {
  const fileUpper = filename.toUpperCase();
  const testJSON = new RegExp("\.JSON");
  const testText = new RegExp("\.T(E)?XT");
  const testXML = new RegExp("\.XML");
  const testCSV = new RegExp("\.CSV");

  if (testJSON.test(fileUpper)) { return 'JSON'; }
  if (testText.test(fileUpper)) { return 'TEXT'; }
  if (testXML.test(fileUpper)) { return 'XML'; }
  if (testXML.test(fileUpper)) { return 'CSV'; }

  console.log('could not detect filetype, setting it to default text (.text,.txt) ... ');
  return 'TEXT';

}
