const {templatedMigration, buildArg} = require('../../../utils');

module.exports = function (name, royaltyPercentage, options = {}) {
  const migration = templatedMigration(async (hre) => {
    const {execute, read, log} = hre.deployments;

    const executeOptions = {
      ...options,
      from: (await hre.getNamedAccounts())[options.from || 'deployer'],
    };
    if (options.log === undefined) executeOptions.log = true;

    const percentage = await buildArg(hre, royaltyPercentage);

    const ROYALTY_FEE_DENOMINATOR = await read(name, {}, 'ROYALTY_FEE_DENOMINATOR');

    log(`${name}: setting royalty percentage to ${percentage}% ...`);
    await execute(name, executeOptions, 'setRoyaltyPercentage', ROYALTY_FEE_DENOMINATOR.mul(percentage).div(100));
  });

  migration.skip = async (hre) => {
    const {read, log} = hre.deployments;

    const ROYALTY_FEE_DENOMINATOR = await read(name, {}, 'ROYALTY_FEE_DENOMINATOR');

    log(`${name}: checking the royalty percentage...`);
    const royaltyInfo = await read(name, {}, 'royaltyInfo', 0, ROYALTY_FEE_DENOMINATOR);

    const percentage = await buildArg(hre, royaltyPercentage);
    if (ROYALTY_FEE_DENOMINATOR.mul(percentage).div(100).eq(royaltyInfo.royaltyAmount)) {
      log(`${name}: royalty percentage already set to ${percentage}, skipping...`);
      return true;
    }

    return false;
  };

  migration.tags = [name, `${name}_setRoyaltyPercentage`];
  migration.dependencies = [`${name}_deploy`];
  return migration;
};
