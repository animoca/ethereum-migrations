const {ethers} = require('hardhat');
const {buildNamedArgs, namedArgsToString} = require('./utils');

const isEqual = require('lodash.isequal');

const FacetCutAction = {
  Add: 0,
  Replace: 1,
  Remove: 2,
};

const newFacetFilter = (el) => !el.name.startsWith('init') && !el.name.startsWith('__');

async function generateCuts(hre, facetsConfig, currentABI = []) {
  let abi = [...currentABI];
  const cuts = [];
  const inits = [];

  for (const facetConfig of facetsConfig) {
    const facet = await hre.deployments.get(facetConfig.name);
    const facetInterface = new ethers.utils.Interface(facet.abi);
    let functions = Object.values(facetInterface.functions);
    // console.log(functions.map((fn) => fn.format(ethers.utils.FormatTypes.minimal)));

    if (facetConfig.abiFilter !== undefined) {
      functions = functions.filter(facetConfig.abiFilter);
    }
    switch (facetConfig.action) {
      case FacetCutAction.Add:
        abi.push(...functions.map((fragment) => JSON.parse(fragment.format(ethers.utils.FormatTypes.json))));
        break;
      case FacetCutAction.Remove:
        abi = abi.filter((el) => functions.find((fragment) => fragment.name == el.name) === undefined);
        break;
    }
    hre.deployments.log(`Diamond: facet cut: ${facetConfig.name} (${facet.address}) ${facetConfig.action} [${functions.map((el) => el.name)}]`);

    cuts.push([
      facetConfig.action == FacetCutAction.Remove ? ethers.constants.AddressZero : facet.address,
      facetConfig.action,
      functions.map((f) => ethers.utils.Interface.getSighash(f)),
    ]);

    if (facetConfig.init !== undefined) {
      const initArguments = facetConfig.init.args !== undefined ? await buildNamedArgs(hre, facetConfig.init.args) : [];
      hre.deployments.log(
        `Diamond: facet init: ${facetConfig.name} (${facet.address}) ${facetConfig.init.method} ${namedArgsToString(initArguments)}`
      );
      inits.push([
        facet.address,
        facetInterface.encodeFunctionData(
          facetConfig.init.method,
          initArguments.map((arg) => arg.value)
        ),
      ]);
    }
  }
  return {abi, cuts, inits};
}

module.exports = {
  FacetCutAction,
  newFacetFilter,
  generateCuts,
};
