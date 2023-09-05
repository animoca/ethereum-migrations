const {templatedMigration, buildArg} = require('../../../utils');

module.exports = function (name, resolverName, preRevealURI, postRevealURI, options = {}) {
  const migration = templatedMigration(async (hre) => {
    const {execute, get, log} = hre.deployments;

    const executeOptions = {
      ...options,
      from: (await hre.getNamedAccounts())[options.from || 'deployer'],
    };
    if (options.log === undefined) executeOptions.log = true;

    const preURI = await buildArg(hre, preRevealURI);
    const postURI = await buildArg(hre, postRevealURI);

    const NFT = await get(name);

    log(`${name}: setting base metadata URIs to pre-reveal=${preURI} post-reveal=${postURI} ...`);
    await execute(resolverName, executeOptions, 'setBaseMetadataURIs', NFT.address, preURI, postURI);
  });

  migration.skip = async (hre) => {
    const {get, read, log} = hre.deployments;

    const NFT = await get(name);

    log(`${name}: checking the pre-reveal base metadata URI for...`);
    const currentURI = await read(resolverName, {}, 'preRevealBaseMetadataURI', NFT.address);

    const uri = await buildArg(hre, preRevealURI);
    if (uri == currentURI) {
      log(`${name}: pre-reveal base metadata URI already set to ${uri}, skipping...`);
      return true;
    }

    return false;
  };

  migration.tags = [name, `${name}_setBaseMetadataURI`];
  migration.dependencies = [`${name}_deploy`, `${resolverName}_deploy`];
  return migration;
};
