const {templatedMigration, buildArg} = require('../utils');

module.exports = function (name, tokenURI, options = {}) {
  const migration = templatedMigration(async (hre) => {
    const {execute, log} = hre.deployments;

    const executeOptions = {
      ...options,
      from: (await hre.getNamedAccounts())[options.from || 'deployer'],
    };
    if (options.log === undefined) executeOptions.log = true;

    const uri = await buildArg(hre, tokenURI);

    log(`${name}: setting tokenURI to ${uri} ...`);
    await execute(name, executeOptions, 'setTokenURI', uri);
  });

  migration.skip = async (hre) => {
    const {read, log} = hre.deployments;

    log(`${name}: checking the tokenURI...`);
    const currentURI = await read(name, {}, 'tokenURI');

    const uri = await buildArg(hre, tokenURI);
    if (uri == currentURI) {
      log(`${name}: tokenURI already set to ${uri}, skipping...`);
      return true;
    }

    return false;
  };

  migration.tags = [name, `${name}_setTokenURI`];
  migration.dependencies = [`${name}_deploy`];
  return migration;
};
