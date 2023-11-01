const {ethers} = require('hardhat');
const {templatedMigration} = require('../../../../utils');
const {multiSkip, skipNetworksTagged, skipChainTypesExceptFor} = require('../../../../../helpers/common');

module.exports = function (rootTunnelName, childTunnelName, options = {}) {
  const migration = templatedMigration(async (hre) => {
    const {execute, log} = hre.deployments;

    const executeOptions = {
      ...options,
      from: (await hre.getNamedAccounts())[options.from || 'deployer'],
    };
    if (options.log === undefined) executeOptions.log = true;

    const childTunnel = await hre.companionNetworks['polygon'].deployments.get(childTunnelName);
    log(`${rootTunnelName}: setting fxChildTunnel ${childTunnelName} (${childTunnel.address})...`);

    await execute(rootTunnelName, executeOptions, 'setFxChildTunnel', childTunnel.address);
  });

  migration.skip = multiSkip(skipNetworksTagged('dev'), skipChainTypesExceptFor('ethereum'), async (hre) => {
    const {read, log} = hre.deployments;

    const childTunnel = await read(rootTunnelName, 'fxChildTunnel');
    if (childTunnel != ethers.ZeroAddress) {
      log(`${rootTunnelName}: fxChildTunnel is already set at address ${childTunnel}, skipping...`);
      return true;
    }

    if ((await hre.companionNetworks['polygon'].deployments.getOrNull(childTunnelName)) == null) {
      log(`${rootTunnelName}: ${childTunnelName} has not been deployed yet on polygon. Deploy it first, skipping...`);
      return true;
    }

    return false;
  });

  migration.tags = [`${rootTunnelName}_setFxChildTunnel_${childTunnelName}`];
  migration.dependencies = [`${rootTunnelName}_deploy`, `${childTunnelName}_deploy`];
  return migration;
};
