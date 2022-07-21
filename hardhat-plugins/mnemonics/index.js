const fse = require('fs-extra');
const path = require('path');
const os = require('os');
const {extendConfig} = require('hardhat/config');

extendConfig((config) => {
  const mnemoId = process.env.MNEMONIC || process.env.MNEMO || 'default';
  const mnemoPath = process.env.MNEMONIC_PATH || process.env.MNEMO_PATH || '';
  let mnemonicFile = path.join(path.normalize(mnemoPath), `.mnemonic_${mnemoId}`);
  const mnemonicFileParts = mnemonicFile.split(path.sep);
  if (mnemonicFileParts[0] === '~') {
    mnemonicFileParts[0] = os.homedir();
  }
  mnemonicFile = path.join(...mnemonicFileParts);
  console.log(`Loading mnemonic for live networks from file: ${mnemonicFile}`);

  let mnemonic;
  try {
    mnemonic = fse.readFileSync(mnemonicFile).toString().replace('\n', '').trim();
  } catch (err) {
    console.log(`Warning: could not read mnemonic file, no transaction can be signed on live networks`);
  }
  const accounts = mnemonic ? {mnemonic} : [];

  for (const networkName of Object.keys(config.networks)) {
    if (config.networks[networkName].live !== false) {
      config.networks[networkName].accounts = accounts;
    }
  }
});
