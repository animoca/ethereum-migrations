const {extendConfig} = require('hardhat/config');

extendConfig((config, userConfig) => {
  const networksConfig = config.networks;
  const providersConfig = userConfig.providers;

  const provider = process.env.NODE_PROVIDER;

  for (const networkName of Object.keys(networksConfig)) {
    const network = networksConfig[networkName];
    if (network.live) {
      let networkURL;
      if (providersConfig[provider] && providersConfig[provider][networkName]) {
        networkURL = providersConfig[provider][networkName];
      } else if (providersConfig[network.defaultProvider] && providersConfig[network.defaultProvider][networkName]) {
        networkURL = providersConfig[network.defaultProvider][networkName];
      }
      if (networkURL) {
        network.url = networkURL.replace(/.*(\{\{.+\}\}).*/, function (match, p) {
          return match.replace(p, process.env[p.replace(/\{|\}/g, '')]);
        });
      } else {
        console.log(
          `Could not retrieve a provider URL for network ${networkName}. ` +
            `env.NODE_PROVIDER=${provider} network.defaultProvider=${network.defaultProvider}`
        );
      }
    }
  }
});
