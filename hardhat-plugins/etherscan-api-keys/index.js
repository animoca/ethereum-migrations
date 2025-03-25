const {extendConfig} = require('hardhat/config');

extendConfig((config, _userConfig) => {
  const networksConfig = config.networks;

  for (const networkName of Object.keys(networksConfig)) {
    const network = networksConfig[networkName];

    if (network.live) {
      const etherscanAPIKey = process.env[`ETHERSCAN_API_KEY_${networkName.toUpperCase()}`];
      if (etherscanAPIKey !== undefined) {
        if (network.verify) {
          if (network.verify.etherscan) {
            network.verify.etherscan.apiKey = etherscanAPIKey;
          } else {
            network.verify.etherscan = {apiKey: etherscanAPIKey};
          }
        } else {
          network.verify = {etherscan: {apiKey: etherscanAPIKey}};
        }
      }
    }
  }
});
