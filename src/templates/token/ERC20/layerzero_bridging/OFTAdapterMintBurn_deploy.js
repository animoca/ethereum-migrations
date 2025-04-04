const Contract_deploy = require('../../../Contract/deploy');
const {getContractAddress, getNamedAccount} = require('../../../../helpers/templates');
const {skipNetworksTagged} = require('../../../../helpers/common');

module.exports = function (erc20DeploymentName, delegate, options = {}) {
  const deploymentName = `OFTAdapterMintBurn_${erc20DeploymentName}`;
  const migration = Contract_deploy(deploymentName, {
    ...options,
    contract: 'OFTAdapterMintBurn',
    args: [
      {name: 'token', value: getContractAddress(erc20DeploymentName)},
      {name: 'lzEndpoint', value: getContractAddress('EndpointV2')},
      {name: 'delegate', value: getNamedAccount(delegate)},
    ],
  });
  migration.skip = skipNetworksTagged('dev');
  migration.dependencies = [`${erc20DeploymentName}_deploy`];
  migration.tags = [erc20DeploymentName];
  return migration;
};
