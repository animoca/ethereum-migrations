const {templatedMigration, buildArg} = require('../../../utils');

module.exports = function (name, resolverName, preRevealTokenURI, postRevealBaseURI, tokenSupply, options = {}) {
  let NFTContract, preURI, postURI, supply;

  const migration = templatedMigration(async (hre) => {
    const {execute, log} = hre.deployments;

    const executeOptions = {
      ...options,
      from: (await hre.getNamedAccounts())[options.from || 'deployer'],
    };
    if (options.log === undefined) executeOptions.log = true;

    log(`${name}: setting token data to preRevealTokenURI=${preURI} postRevealBaseURI=${postURI} tokenSupply=${supply} ...`);
    await execute(resolverName, executeOptions, 'setTokenData', NFTContract.address, preURI, postURI, supply);
  });

  migration.skip = async (hre) => {
    const {get, read, log} = hre.deployments;

    NFTContract = await get(name);

    preURI = await buildArg(hre, preRevealTokenURI);
    postURI = await buildArg(hre, postRevealBaseURI);
    supply = await buildArg(hre, tokenSupply);

    log(`${name}: retrieving the token data...`);

    if (
      preURI == (await read(resolverName, {}, 'preRevealTokenMetadataURI', NFTContract.address)) &&
      postURI == (await read(resolverName, {}, 'postRevealBaseMetadataURI', NFTContract.address)) &&
      supply == (await read(resolverName, {}, 'tokenSupply', NFTContract.address))
    ) {
      log(`${name}: token data already set to preRevealTokenURI=${preURI} postRevealBaseURI=${postURI} tokenSupply=${supply}, skipping...`);
      return true;
    }

    return false;
  };

  migration.tags = [name, `${name}_setTokenData`];
  migration.dependencies = [`${name}_deploy`, `${resolverName}_deploy`];
  return migration;
};
