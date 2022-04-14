const {getExtendedArtifactFromFolders} = require('hardhat-deploy/dist/src/utils');
const {skipIfContractExists} = require('../helpers');
const {buildArguments} = require('../templates-utils');

let deployment = function (name, artifactName, deploymentArgs, options = {}) {
  let migration = async (hre) => {
    const {deploy} = hre.deployments;

    const contract = options.importPath !== undefined ? await getExtendedArtifactFromFolders(artifactName, [options.importPath]) : artifactName;
    const from = (await hre.getNamedAccounts())[options.deployer || 'deployer'];
    const args = await buildArguments(deploymentArgs)(hre);

    console.log(`${name}: Deploying with args [${args.map((arg) => `${arg.name}: ${arg.value}`).join(', ')}] ...`);
    const deployedContract = await deploy(name, {contract, from, args: args.map((arg) => arg.value)});
    console.log(
      `${name}: Deployed at ${deployedContract.address} (tx: ${deployedContract.transactionHash}, gasUsed: ${deployedContract.receipt.gasUsed})`
    );
  };

  migration.skip = skipIfContractExists(name);

  migration.tags = [`${name}_deploy`, ...(options.tags || [])];

  migration.dependencies = options.dependencies;

  return migration;
};

module.exports = {
  deployment,
};
