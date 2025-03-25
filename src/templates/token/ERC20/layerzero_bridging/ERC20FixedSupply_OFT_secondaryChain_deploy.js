const ERC20FixedSupply_deploy = require('../ERC20FixedSupply_deploy');

module.exports = function (deploymentName, primaryChainDeploymentName, primaryChainType, tokenName, tokenSymbol, tokenDecimals, options = {}) {
  const holders = async (hre) => {
    const {ethers, getNamedAccounts} = hre;
    const from = (await getNamedAccounts())[options.from || 'deployer'];
    const signer = await ethers.getSigner(from);
    // compute the address of the OFTAdapter which will be deployed right after this contract
    const oftAdaptAddress = await ethers.getCreateAddress({from: signer.address, nonce: (await signer.getNonce()) + 1});
    return [oftAdaptAddress];
  };

  const allocations = async (hre) => {
    return [await hre.companionNetworks[primaryChainType].deployments.read(primaryChainDeploymentName, 'totalSupply')];
  };

  const migration = ERC20FixedSupply_deploy(deploymentName, tokenName, tokenSymbol, tokenDecimals, holders, allocations, options);
  migration.dependencies = [primaryChainDeploymentName];
  return migration;
};
