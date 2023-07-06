const {templatedMigration} = require('../utils');
const {skipIfDeployed} = require('../../helpers/common');
const {generateCuts} = require('../diamond');

module.exports = function (name, facetsConfig, options = {}) {
  const migration = templatedMigration(async (hre) => {
    const {deploy, save, log} = hre.deployments;

    const deployOptions = {
      ...options,
      from: (await hre.getNamedAccounts())[options.from || 'deployer'],
    };

    log(`${name}: deploying Diamond`);

    const {abi, cuts, inits} = await generateCuts(hre, facetsConfig);

    deployOptions.contract = 'Diamond';
    deployOptions.args = [cuts, inits];

    const Diamond = await deploy(name, deployOptions);

    log(`${name}: Deployed ${Diamond.address} (tx: ${Diamond.transactionHash}, gasUsed: ${Diamond.receipt.gasUsed})`);

    await save(name, {abi, address: Diamond.address});
  });

  migration.skip = skipIfDeployed(name);

  migration.dependencies = facetsConfig.map((facetConfig) => `${facetConfig.name}_deploy`);
  migration.tags = [name, `${name}_deploy`];
  return migration;
};
