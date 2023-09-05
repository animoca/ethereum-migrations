const {templatedMigration, buildArg} = require('../../utils');

module.exports = function (name, resolverName, baseMetadataURI, options = {}) {
  const migration = templatedMigration(async (hre) => {
    const {execute, get, log} = hre.deployments;

    const executeOptions = {
      ...options,
      from: (await hre.getNamedAccounts())[options.from || 'deployer'],
    };
    if (options.log === undefined) executeOptions.log = true;

    const uri = await buildArg(hre, baseMetadataURI);

    const NFT = await get(name);

    log(`${name}: setting baseMetadataURI for ${name} (${NFT.address}) to ${uri} ...`);
    await execute(resolverName, executeOptions, 'setBaseMetadataURI', NFT.address, uri);
  });

  migration.skip = async (hre) => {
    const {read, log} = hre.deployments;

    log(`${name}: checking the baseMetadataURI for ${name} (${NFT.address})...`);
    const currentURI = await read(resolverName, {}, NFT.address, 'baseMetadataURI');

    const uri = await buildArg(hre, baseMetadataURI);
    if (uri == currentURI) {
      log(`${name}: baseMetadataURI already set to ${uri}, skipping...`);
      return true;
    }

    return false;
  };

  migration.tags = [name, `${name}_setBaseMetadataURI`];
  migration.dependencies = [`${name}_deploy`, `${resolverName}_deploy`];
  return migration;
};
