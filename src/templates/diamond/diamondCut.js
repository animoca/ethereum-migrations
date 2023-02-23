const {ethers} = require('hardhat');
const {templatedMigration} = require('../utils');
const {generateCuts, FacetCutAction} = require('../diamond');

module.exports = function (name, facetsConfig, options = {}) {
  const migration = templatedMigration(async (hre) => {
    const {execute, get, save, log} = hre.deployments;

    const executeOptions = {
      ...options,
      from: (await hre.getNamedAccounts())[options.from || 'deployer'],
    };

    log(`${name}: executing diamondCut`);

    const Diamond = await get(name);

    const {abi, cuts, inits} = await generateCuts(hre, facetsConfig, Diamond.abi);

    await execute(name, executeOptions, 'diamondCut((address,uint8,bytes4[])[],(address,bytes)[])', cuts, inits);

    await save(name, {abi, address: Diamond.address});
  });

  migration.skip = async (hre) => {
    const {get, read, log} = hre.deployments;
    const facetConfig = facetsConfig[0];
    const facet = await get(facetConfig.name);
    const facetInterface = new ethers.utils.Interface(facet.abi);
    let functions = Object.values(facetInterface.functions);
    if (facetConfig.abiFilter !== undefined) {
      functions = functions.filter(facetConfig.abiFilter);
    }
    const currentFacetAddress = await read(name, 'facetAddress', ethers.utils.Interface.getSighash(functions[0]));
    switch (facetConfig.action) {
      case FacetCutAction.Add:
        if (currentFacetAddress == facet.address) {
          log(`${name}: facet ADD already done, skipping...`);
          return true;
        }
        return false;
      case FacetCutAction.Remove:
        if (currentFacetAddress == ethers.constants.AddressZero) {
          log(`${name}: facet REMOVE already done, skipping...`);
          return true;
        }
        return false;
      case FacetCutAction.Replace:
        if (currentFacetAddress == facet.address) {
          log(`${name}: facet REPLACE already done, skipping...`);
          return true;
        }
        return false;
    }
  };

  migration.dependencies = [`${name}_deploy`];
  migration.tags = [name];
  return migration;
};
