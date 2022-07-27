const {getExtendedArtifactFromFolders} = require('hardhat-deploy/dist/src/utils');
const {skipIfContractExists} = require('../../helpers/common');
const {templatedMigration, buildNamedArgs, namedArgsToString} = require('../../templates/utils');

const {TASK_ETHERSCAN_VERIFY} = require('hardhat-deploy');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function etherscanVerify(hre, contractName) {
  return hre.run(TASK_ETHERSCAN_VERIFY, {contractName, writePostData: true});
}

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
      deployOptions.contract = await getExtendedArtifactFromFolders(options.contract, [options.importPath]);
      delete deployOptions.importPath;
    }

    let args;
    if (options.args) {
      args = await buildNamedArgs(hre, options.args);
      deployOptions.args = args.map((arg) => arg.value);
    }

    let initArgs;
    if (options.proxy && options.proxy.execute) {
      if (options.proxy.execute.args) {
        initArgs = await buildNamedArgs(hre, options.proxy.execute.args);
        deployOptions.proxy.execute.args = initArgs.map((arg) => arg.value);
      } else {
        if (options.proxy.execute.init && options.proxy.execute.init.args) {
          initArgs = await buildNamedArgs(hre, options.proxy.execute.init.args);
          deployOptions.proxy.execute.init.args = initArgs.map((arg) => arg.value);
        }
        if (options.proxy.execute.onUpgrade && options.proxy.execute.onUpgrade.args) {
          initArgs = await buildNamedArgs(hre, options.proxy.execute.onUpgrade.args);
          deployOptions.proxy.execute.onUpgrade.args = initArgs.map((arg) => arg.value);
        }
      }
    }

    if (options.proxy && options.proxy.withOwnAdminContract) {
      deployOptions.proxy.viaAdminContract = {
        name: `${name}_ProxyAdmin`,
        artifact: await getExtendedArtifactFromFolders('ProxyAdmin', ['node_modules/hardhat-deploy/extendedArtifacts']),
      };
    }

    log(
      `${name}: Deploying` +
        `${options.deterministicDeployment ? ' (deterministically)' : ''}` +
        `${args ? ` with args ${namedArgsToString(args)}` : ''}` +
        `${options.proxy ? ' via proxy' : ''}` +
        `${initArgs ? ` with initArgs ${namedArgsToString(initArgs)}` : ''}` +
        ' ...'
    );
    const deployedContract = await deploy(name, deployOptions);

    log(`${name}: Deployed ${deployedContract.address} (tx: ${deployedContract.transactionHash}, gasUsed: ${deployedContract.receipt.gasUsed})`);

    if (hre.network.live) {
      const secondsToSleep = 60; // arbitrary, make sure etherscan's node picked up the latest block
      log(`${name}: Will submit source code verification request(s) in ${secondsToSleep}s`);
      await sleep(secondsToSleep * 1000);
      if (options.proxy) {
        if (options.proxy.proxyContract == 'OptimizedTransparentProxy') {
          if (deployOptions.proxy.viaAdminContract && deployOptions.proxy.viaAdminContract.name) {
            await etherscanVerify(hre, deployOptions.proxy.viaAdminContract.name);
          } else {
            await etherscanVerify(hre, 'DefaultProxyAdmin');
          }
        }

        await etherscanVerify(hre, `${name}_Implementation`);
        await etherscanVerify(hre, `${name}_Proxy`);
      } else {
        await etherscanVerify(hre, name);
      }
    }
  });
  migration.skip = skipIfContractExists(name);
  migration.tags = [name, `${name}_deploy`];
  return migration;
};
