const Contract_deploy = require('../../../Contract/deploy');
const {getContractAddress, getNamedAccount} = require('../../../../helpers/templates');
const {network} = require('hardhat');

module.exports = function (erc20PrimaryDeploymentName, delegate, options = {}) {
  const localERC20DeploymentName = `${erc20PrimaryDeploymentName}_${network.name}`;
  const deploymentName = `OFTAdapterFixedSupply@4.0_${localERC20DeploymentName}`;
  const migration = Contract_deploy(deploymentName, {
    ...options,
    contract: 'OFTAdapterFixedSupply',
    args: [
      {name: 'token', value: getContractAddress(localERC20DeploymentName)},
      {name: 'lzEndpoint', value: getContractAddress('EndpointV2')},
      {name: 'delegate', value: getNamedAccount(delegate)},
    ],
    deterministic: true,
    deterministicSalt: deploymentName,
  });
  migration.skip = async (hre) => {
    const {log} = hre.deployments;
    const {live, name} = hre.network;
    if (!live) {
      log(`${deploymentName}: non-live network ${name}, skipping...`);
      return true;
    }
    return false;
  };
  migration.dependencies = [`${localERC20DeploymentName}_deploy`];
  migration.tags = [erc20PrimaryDeploymentName, localERC20DeploymentName];
  return migration;
};
