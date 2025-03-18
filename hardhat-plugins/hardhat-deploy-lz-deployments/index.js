const {join} = require('path');
const {extendConfig} = require('hardhat/config');
const {endpointIdToNetwork} = require('@layerzerolabs/lz-definitions');

// code adapted from https://github.com/LayerZero-Labs/devtools/blob/main/packages/devtools-evm-hardhat/src/config.ts

extendConfig((config, _userConfig) => {
  if (config.external === undefined) {
    config.external = {};
  }
  const external = config.external;

  if (external.deployments === undefined) {
    external.deployments = {};
  }

  const resolvedDeploymentsDirectories = [`node_modules/@layerzerolabs/lz-evm-sdk-v2/deployments`];

  for (const [networkName, networkConfig] of Object.entries(config.networks ?? {})) {
    if (!networkConfig.live) continue;

    const eid = networkConfig.eid;

    if (!eid) {
      console.log(`Endpoint ID (eid) not specified in hardhat config for network ${networkName}, skipping external deployment configuration`);
      continue;
    }

    try {
      const layerZeroNetworkName = endpointIdToNetwork(eid, networkConfig?.isLocalEid);
      const layerZeroNetworkDeploymentsDirectories = resolvedDeploymentsDirectories.map((deploymentsDirectory) =>
        join(deploymentsDirectory, layerZeroNetworkName),
      );

      if (external.deployments[networkName] == undefined) {
        external.deployments[networkName] = [];
      }
      external.deployments[networkName].push(...layerZeroNetworkDeploymentsDirectories);
    } catch (error) {
      console.log(`Error while adding external deployments for network ${networkName}, skipping`);
      console.log(error);
      continue;
    }
  }
});
