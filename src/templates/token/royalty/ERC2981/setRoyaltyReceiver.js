const {templatedMigration, buildArg} = require('../../../utils');

module.exports = function (name, royaltyReceiver, options = {}) {
  const migration = templatedMigration(async (hre) => {
    const {execute, log} = hre.deployments;

    const executeOptions = {
      ...options,
      from: (await hre.getNamedAccounts())[options.from || 'deployer'],
    };
    if (options.log === undefined) executeOptions.log = true;

    const receiver = await buildArg(hre, royaltyReceiver);

    log(`${name}: setting royalty receiver to ${receiver} ...`);
    await execute(name, executeOptions, 'setRoyaltyReceiver', receiver);
  });

  migration.skip = async (hre) => {
    const {read, log} = hre.deployments;

    log(`${name}: checking the royalty receiver...`);
    const royaltyInfo = await read(name, {}, 'royaltyInfo', 0, 0);

    const receiver = await buildArg(hre, royaltyReceiver);
    if (receiver == royaltyInfo.receiver) {
      log(`${name}: royalty receiver already set to ${receiver}, skipping...`);
      return true;
    }

    return false;
  };

  migration.tags = [name, `${name}_setRoyaltyReceiver`];
  migration.dependencies = [`${name}_deploy`];
  return migration;
};
