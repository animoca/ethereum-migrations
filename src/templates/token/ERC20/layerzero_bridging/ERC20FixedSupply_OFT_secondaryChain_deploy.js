const Contract_deploy = require('../../../Contract/deploy');
const {getContractAddress} = require('../../../../helpers/templates');

module.exports = function (deploymentName, primaryChainType, tokenName, tokenSymbol, tokenDecimals, options = {}) {
  const migration = Contract_deploy(deploymentName, {
    ...options,
    contract: 'ERC20FixedSupply',
    args: [
      {name: 'name', value: tokenName},
      {name: 'symbol', value: tokenSymbol},
      {name: 'decimals', value: tokenDecimals},
      {
        name: 'holders',
        value: async (hre) => {
          const {deterministic} = hre.deployments;
          const adapterDeploymentName = `OFTAdapterFixedSupply@4.0_${deploymentName}`;
          const adapterDeterministicDeploymentInfo = await deterministic(adapterDeploymentName, {
            contract: 'OFTAdapterFixedSupply',
            deterministic: true,
            deterministicSalt: adapterDeploymentName,
            from: (await hre.getNamedAccounts())[options.from || 'deployer'],
          });
          return [adapterDeterministicDeploymentInfo.address];
        },
      },
      {
        name: 'allocations',
        value: async (hre) => {
          return await hre.companionNetworks[primaryChainType].deployments.read(deploymentName, 'totalSupply');
        },
      },
      {name: 'ForwarderRegistry', value: getContractAddress('ForwarderRegistry@4.1')},
    ],
  });
  migration.dependencies = ['ForwarderRegistry@4.1_deploy'];
  return migration;
};
