const {constants} = require('ethers');
const {templatedMigration} = require('../../../../utils');
const {multiSkip, skipIfNetworkIsTagged, skipIfChainTypeIsNot} = require('../../../../../helpers/common');

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

  migration.skip = multiSkip(skipIfNetworkIsTagged('dev'), skipIfChainTypeIsNot('polygon'), async (hre) => {
    const {read, log} = hre.deployments;

    const rootTunnel = await read(childTunnelName, 'fxRootTunnel');
    if (rootTunnel != constants.AddressZero) {
      log(`${childTunnelName}: fxRootTunnel is already set at address ${rootTunnel}, skipping...`);
      return true;
    }
    return false;
  });

  migration.tags = [`${childTunnelName}_setFxRootTunnel_${rootTunnelName}`];
  migration.dependencies = [`${childTunnelName}_deploy`, `${rootTunnelName}_deploy`];
  return migration;
};
