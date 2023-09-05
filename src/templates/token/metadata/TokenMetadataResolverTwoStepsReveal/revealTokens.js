const {templatedMigration, buildArg} = require('../../../utils');

module.exports = function (name, resolverName, options = {}) {
  const migration = templatedMigration(async (hre) => {
    const {execute, get, log} = hre.deployments;

    const executeOptions = {
      ...options,
      from: (await hre.getNamedAccounts())[options.from || 'deployer'],
    };
    if (options.log === undefined) executeOptions.log = true;

    const NFT = await get(name);

    log(`${name}: Revealing tokens...`);
    await execute(resolverName, executeOptions, 'revealTokens', NFT.address);
  });

  migration.skip = async (hre) => {
    const {read, log} = hre.deployments;

    const NFT = await get(name);

    log(`${name}: checking the tokens reveal status...`);

    if (await read(resolverName, {}, 'isTokenRevealed', NFT.address)) {
      log(`${name}: tokens already revealed, skipping...`);
      return true;
    }

    return false;
  };

  migration.tags = [name, `${name}_setBaseMetadataURI`];
  migration.dependencies = [`${name}_deploy`, `${resolverName}_deploy`];
  return migration;
};
