const {constants} = require('ethers');
const {templatedMigration} = require('../../../../utils');
const {multiSkip, skipIfNetworkIsTagged, skipIfChainTypeIsNot} = require('../../../../../helpers/common');

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

  migration.skip = multiSkip(skipIfNetworkIsTagged('dev'), skipIfChainTypeIsNot('ethereum'), async (hre) => {
    const {read, log} = hre.deployments;

    const childTunnel = await read(rootTunnelName, 'fxChildTunnel');
    if (childTunnel != constants.AddressZero) {
      log(`${rootTunnelName}: fxChildTunnel is already set at address ${childTunnel}, skipping...`);
      return true;
    }
    return false;
  });

  migration.tags = [`${rootTunnelName}_setFxChildTunnel_${childTunnelName}`];
  migration.dependencies = [`${rootTunnelName}_deploy`, `${childTunnelName}_deploy`];
  return migration;
};
