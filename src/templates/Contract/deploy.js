const {skipIfContractExists} = require('../../helpers/common');
const {templatedMigration, buildNamedArgs, namedArgsToString} = require('../../templates/utils');

module.exports = function (name, options = {}) {
  const migration = templatedMigration(async (hre) => {
    const {deploy, log} = hre.deployments;

    const deployOptions = {
      ...options,
      from: (await hre.getNamedAccounts())[options.from || 'deployer'],
    };

    // to be removed if PR is merged
    // https://github.com/wighawag/hardhat-deploy/issues/343
    // https://github.com/wighawag/hardhat-deploy/pull/344
    if (options.importPath) {
      const {getArtifactFromFolders} = require('hardhat-deploy/dist/src/utils');
      deployOptions.contract = await getArtifactFromFolders(options.contract, [options.importPath]);
      delete deployOptions.importPath;
    }

    let args;
    if (options.args) {
      args = await buildNamedArgs(hre, options.args);
      deployOptions.args = args.map((arg) => arg.value);
    }

    log(
      `${name}: Deploying` +
        `${options.deterministicDeployment ? ' (deterministically)' : ''}` +
        `${args ? ` with args ${namedArgsToString(args)}` : ''} ...`
    );
    const deployedContract = await deploy(name, deployOptions);

    log(`${name}: Deployed ${deployedContract.address} (tx: ${deployedContract.transactionHash}, gasUsed: ${deployedContract.receipt.gasUsed})`);
  });
  migration.skip = skipIfContractExists(name);
  migration.tags = [name, `${name}_deploy`];
  return migration;
};
