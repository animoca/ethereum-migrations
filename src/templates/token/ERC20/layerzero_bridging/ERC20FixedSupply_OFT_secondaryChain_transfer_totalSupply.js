const ethers = require('ethers');
const {templatedMigration} = require('../../../utils');

module.exports = function (deploymentName, options = {}) {
  let from;
  let totalSupply;

  const oftAdapterDeploymentName = `OFTAdapterFixedSupply_${deploymentName}`;

  const migration = templatedMigration(async (hre) => {
    const {execute, get, log} = hre.deployments;

    const executeOptions = {
      ...options,
      from: from,
    };
    if (options.log === undefined) executeOptions.log = true;

    log(`${deploymentName}: transferring the total supply (${ethers.formatEther(totalSupply)}) to the OFTAdapter (${oftAdapterDeploymentName})...`);
    await execute(deploymentName, executeOptions, 'transfer', (await get(oftAdapterDeploymentName)).address, totalSupply);
  });

  migration.skip = async (hre) => {
    const {read, log} = hre.deployments;

    log(`${deploymentName}: checking the totalSupply...`);
    totalSupply = await read(deploymentName, {}, 'totalSupply');

    from = (await hre.getNamedAccounts())[options.from || 'deployer'];
    const balance = await read(deploymentName, {}, 'balanceOf', from);
    if (balance.toString() !== totalSupply.toString()) {
      log(`${deploymentName}: balance of ${from} is not equal to totalSupply, skipping...`);
      return true;
    }
    return false;
  };

  migration.tags = [deploymentName, `${deploymentName}_transfer_totalSupply`];
  migration.dependencies = [`${deploymentName}_deploy`, `${oftAdapterDeploymentName}_deploy`];
  return migration;
};
