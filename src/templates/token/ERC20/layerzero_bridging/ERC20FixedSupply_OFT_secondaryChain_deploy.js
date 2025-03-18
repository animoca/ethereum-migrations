const ERC20FixedSupply_deploy = require('../ERC20FixedSupply_deploy');
const {network} = require('hardhat');

module.exports = function (primaryDeploymentName, primaryChainType, tokenName, tokenSymbol, tokenDecimals, options = {}) {
  const holders = async (hre) => {
    const {deterministic} = hre.deployments;
    const adapterDeploymentName = `OFTAdapterFixedSupply@4.0_${primaryDeploymentName}`;
    const adapterDeterministicDeploymentInfo = await deterministic(adapterDeploymentName, {
      contract: 'OFTAdapterFixedSupply',
      deterministic: true,
      deterministicSalt: adapterDeploymentName,
      from: (await hre.getNamedAccounts())[options.from || 'deployer'],
    });
    return [adapterDeterministicDeploymentInfo.address];
  };

  const allocations = async (hre) => {
    return [await hre.companionNetworks[primaryChainType].deployments.read(primaryDeploymentName, 'totalSupply')];
  };

  const deploymenName = `${primaryDeploymentName}_${network.name}`;
  const migration = ERC20FixedSupply_deploy(deploymenName, tokenName, tokenSymbol, tokenDecimals, holders, allocations, options);
  migration.dependencies = [`${primaryDeploymentName}_deploy`];
  migration.tags = [primaryDeploymentName];
  return migration;
};
