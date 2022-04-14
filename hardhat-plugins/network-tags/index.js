const {extendConfig} = require('hardhat/config');

const tags = process.env.NETWORK_TAGS;

if (tags !== undefined) {
  const tagsList = tags.split(',');
  extendConfig((config, userConfig) => {
    for (const name of Object.keys(config.networks)) {
      config.networks[name].tags.push(...tagsList);
    }
  });
}
