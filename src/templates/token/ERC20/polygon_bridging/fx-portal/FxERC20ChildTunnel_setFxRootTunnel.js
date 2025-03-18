const {ethers} = require('hardhat');
const {templatedMigration} = require('../../../../utils');
const {multiSkip, skipNetworksTagged, skipNetworks, skipChainTypesExceptFor} = require('../../../../../helpers/common');

module.exports = function (childTunnelName, rootTunnelName, options = {}) {
  const migration = templatedMigration(async (hre) => {
    const {execute, log} = hre.deployments;

    const executeOptions = {
      ...options,
      from: (await hre.getNamedAccounts())[options.from || 'deployer'],
    };
    if (options.log === undefined) executeOptions.log = true;

    const rootTunnel = await hre.companionNetworks['ethereum'].deployments.get(rootTunnelName);
    log(`${childTunnelName}: setting fxRootTunnel ${rootTunnelName} (${rootTunnel.address})...`);

    await execute(childTunnelName, executeOptions, 'setFxRootTunnel', rootTunnel.address);
  });

  migration.skip = multiSkip(
    skipNetworksTagged('dev'),
    skipNetworks(['amoy']), // until fx-portal is supported on amoy
    skipChainTypesExceptFor('polygon'),
    async (hre) => {
      const {read, log} = hre.deployments;

      const rootTunnel = await read(childTunnelName, 'fxRootTunnel');
      if (rootTunnel != ethers.ZeroAddress) {
        log(`${childTunnelName}: fxRootTunnel is already set at address ${rootTunnel}, skipping...`);
        return true;
      }

      if ((await hre.companionNetworks['ethereum'].deployments.getOrNull(rootTunnelName)) == null) {
        log(`${childTunnelName}: ${rootTunnelName} has not been deployed yet on ethereum. Deploy it first, skipping...`);
        return true;
      }

      return false;
    },
  );

  migration.tags = [`${childTunnelName}_setFxRootTunnel_${rootTunnelName}`];
  migration.dependencies = [`${childTunnelName}_deploy`, `${rootTunnelName}_deploy`];
  return migration;
};
