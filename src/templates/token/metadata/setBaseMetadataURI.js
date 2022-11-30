const {templatedMigration, buildArg} = require('../../utils');

module.exports = function (name, baseMetadataURI, options = {}) {
  const migration = templatedMigration(async (hre) => {
    const {execute, log} = hre.deployments;

    const executeOptions = {
      ...options,
      from: (await hre.getNamedAccounts())[options.from || 'deployer'],
    };
    if (options.log === undefined) executeOptions.log = true;

    const uri = await buildArg(hre, baseMetadataURI);

    log(`${name}: setting baseMetadataURI to ${uri} ...`);
    await execute(name, executeOptions, 'setBaseMetadataURI', uri);
  });

  migration.skip = async (hre) => {
    const {read, log} = hre.deployments;

    log(`${name}: checking the baseMetadataURI...`);
    const currentURI = await read(name, {}, 'baseMetadataURI');

    const uri = await buildArg(hre, baseMetadataURI);
    if (uri == currentURI) {
      log(`${name}: baseMetadataURI already set to ${uri}, skipping...`);
      return true;
    }

    return false;
  };

  migration.tags = [name, `${name}_setBaseMetadataURI`];
  migration.dependencies = [`${name}_deploy`];
  return migration;
};
