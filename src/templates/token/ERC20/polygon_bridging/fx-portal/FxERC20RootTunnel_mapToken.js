const {constants} = require('ethers');
const {templatedMigration} = require('../../../../utils');
const {multiSkip, skipNetworksTagged, skipChainTypesExceptFor} = require('../../../../../helpers/common');

module.exports = function (rootTunnelName, rootTokenName, options = {}) {
  const migration = templatedMigration(async (hre) => {
    const {getArtifact, execute, get, read, log} = hre.deployments;

    const executeOptions = {
      ...options,
      from: (await hre.getNamedAccounts())[options.from || 'deployer'],
    };
    if (options.log === undefined) executeOptions.log = true;

    const RootToken = await get(rootTokenName);
    log(`${rootTunnelName}: mapping ERC20 token ${rootTokenName}...`);
    await execute(rootTunnelName, executeOptions, 'mapToken', RootToken.address);
    const childToken = await read(rootTunnelName, 'rootToChildToken', RootToken.address);
    const FxERC20Interface = await getArtifact('IFxERC20');
    hre.companionNetworks['polygon'].deployments.save(`Polygon${rootTokenName}`, {
      abi: [...RootToken.abi, ...FxERC20Interface.abi],
      address: childToken,
    });
  });

  migration.skip = multiSkip(skipNetworksTagged('dev'), skipChainTypesExceptFor('ethereum'), async (hre) => {
    const {read, get, log} = hre.deployments;

    const RootToken = await get(rootTokenName);
    const childToken = await read(rootTunnelName, 'rootToChildToken', RootToken.address);
    if (childToken != constants.AddressZero) {
      log(`${rootTunnelName}: ERC20 token ${rootTokenName} is already mapped at address ${childToken}, skipping...`);
      return true;
    }
    return false;
  });

  migration.tags = [rootTokenName, `${rootTunnelName}_mapToken_${rootTokenName}`];
  migration.dependencies = [`${rootTunnelName}_deploy`, `${rootTokenName}_deploy`];
  return migration;
};
