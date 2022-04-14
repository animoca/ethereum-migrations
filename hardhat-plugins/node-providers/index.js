const {extendConfig} = require('hardhat/config');

extendConfig((config, userConfig) => {
  const networksConfig = config.networks;
  const providersConfig = userConfig.providers;

  const provider = process.env.NODE_PROVIDER;

  for (const networkName of Object.keys(networksConfig)) {
    const network = networksConfig[networkName];
    const networkProvider = provider || network.defaultProvider;
    if (networkProvider !== undefined) {
      if (providersConfig[networkProvider] !== undefined && providersConfig[networkProvider][network.url] !== undefined) {
        network.url = providersConfig[networkProvider][network.url].replace(/.*(\{\{.+\}\}).*/, function (match, p) {
          return match.replace(p, process.env[p.replace(/\{|\}/g, '')]);
        });
      }
    }
  }
});
