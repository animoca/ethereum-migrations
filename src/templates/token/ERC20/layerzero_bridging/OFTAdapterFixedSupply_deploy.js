const Contract_deploy = require('../../../Contract/deploy');
const {getContractAddress, getNamedAccount} = require('../../../../helpers/templates');

module.exports = function (erc20DeploymentName, delegate, options = {}) {
  const deploymentName = `OFTAdapterFixedSupply@4.0_${erc20DeploymentName}`;
  const migration = Contract_deploy(deploymentName, {
    ...options,
    contract: 'OFTAdapterFixedSupply',
    args: [
      {name: 'token', value: getContractAddress(erc20DeploymentName)},
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
  migration.dependencies = [`${erc20DeploymentName}_deploy`];
  migration.tags = [erc20DeploymentName];
  return migration;
};
