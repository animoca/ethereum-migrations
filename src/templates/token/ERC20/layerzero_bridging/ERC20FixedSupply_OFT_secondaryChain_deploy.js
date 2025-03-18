const ERC20FixedSupply_deploy = require('../ERC20FixedSupply_deploy');

module.exports = function (deploymentName, primaryChainType, tokenName, tokenSymbol, tokenDecimals, options = {}) {
  const holders = async (hre) => {
    const {deterministic} = hre.deployments;
    const adapterDeploymentName = `OFTAdapterFixedSupply@4.1_${deploymentName}`;
    const adapterDeterministicDeploymentInfo = await deterministic(adapterDeploymentName, {
      contract: 'OFTAdapterFixedSupply',
      deterministic: true,
      deterministicSalt: adapterDeploymentName,
      from: (await hre.getNamedAccounts())[options.from || 'deployer'],
    });
    return [adapterDeterministicDeploymentInfo.address];
  };

  const allocations = async (hre) => {
    return [await hre.companionNetworks[primaryChainType].deployments.read(deploymentName, 'totalSupply')];
  };

  const migration = ERC20FixedSupply_deploy(deploymenName, tokenName, tokenSymbol, tokenDecimals, holders, allocations, options);
  migration.dependencies = [`${deploymentName}_deploy`];
  migration.tags = [deploymentName];
  return migration;
};
