const {templatedMigration, buildArg} = require('../../utils');

module.exports = function (name, newOwner, options = {}) {
  const migration = templatedMigration(async (hre) => {
    const {execute, log} = hre.deployments;

    const executeOptions = {
      ...options,
      from: (await hre.getNamedAccounts())[options.from || 'deployer'],
    };
    if (options.log === undefined) executeOptions.log = true;

    const owner = await buildArg(hre, newOwner);

    log(`${name}: transferring contract ownership to ${owner} ...`);
    await execute(name, executeOptions, 'transferOwnership', owner);
  });

  migration.skip = async (hre) => {
    const {read, log} = hre.deployments;

    log(`${name}: checking the contract owner...`);
    const currentOwner = await read(name, {}, 'owner');

    const owner = await buildArg(hre, newOwner);
    if (currentOwner == owner) {
      log(`${name}: contract owner already set to ${owner}, skipping...`);
      return true;
    }

    return false;
  };

  migration.tags = [name, `${name}_transferOwnership`];
  migration.dependencies = [`${name}_deploy`];
  return migration;
};
