const ERC20FixedSupply_deploy = require('../ERC20FixedSupply_deploy');
const {getNamedAccount} = require('../../../../helpers/templates');

module.exports = function (deploymentName, primaryChainDeploymentName, primaryChainType, tokenName, tokenSymbol, tokenDecimals, options = {}) {
  const holders = [getNamedAccount(options.from || 'deployer')];

  const allocations = async (hre) => {
    return [await hre.companionNetworks[primaryChainType].deployments.read(primaryChainDeploymentName, 'totalSupply')];
  };

  const migration = ERC20FixedSupply_deploy(deploymentName, tokenName, tokenSymbol, tokenDecimals, holders, allocations, options);
  return migration;
};
