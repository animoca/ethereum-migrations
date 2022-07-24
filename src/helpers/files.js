const path = require('path');
const fse = require('fs-extra');

function generatedFilePath(hre, fileName) {
  return path.join(hre.config.paths.generated, hre.network.name, fileName);
}

function readFile(hre, fileName) {
  const {log} = hre.deployments;
  const filePath = generatedFilePath(hre, fileName);
  const data = fse.readFileSync(filePath);
  log('File read:', filePath);
  return data;
}

function writeFile(hre, fileName, data) {
  const {log} = hre.deployments;
  const filePath = generatedFilePath(hre, fileName);
  fse.mkdirpSync(path.dirname(filePath));
  fse.writeFileSync(filePath, data);
  log('File written:', filePath);
}

function skipIfFileExists(fileName) {
  return async (hre) => {
    const {log} = hre.deployments;
    const filePath = generatedFilePath(hre, fileName);
    if (fse.existsSync(filePath)) {
      log(`${filePath}: already exists, skipping...`);
      return true;
    }
    return false;
  };
}

module.exports = {
  generatedFilePath,
  readFile,
  writeFile,
  skipIfFileExists,
};
