const Contract_deploy = require('../../../../../src/templates/Contract/deploy');
const {getNamedAccount, getContractAddress} = require('../../../../../src/helpers/templates');
const {multiSkip, skipNetworks, skipChainTypesExceptFor} = require('../../../../../src/helpers/common');

module.exports = Contract_deploy('FxERC20MintBurnRootTunnel@2.0', {
  contract: 'FxERC20MintBurnRootTunnel',
  importPath: 'node_modules/@animoca/ethereum-contracts-bridging-2.0/artifacts',
  args: [
    {name: 'CheckpointManager', value: getNamedAccount('FxPortal_CheckpointManager')},
    {name: 'FxRoot', value: getNamedAccount('FxPortal_FxRoot')},
    {name: 'ChildTokenLogic', value: async (hre) => (await hre.companionNetworks['polygon'].deployments.get('FxERC20MintBurn@2.0')).address},
    {name: 'ForwarderRegistry', value: getContractAddress('ForwarderRegistry@4.1')},
  ],
  deterministicDeployment: true,
});
module.exports.skip = multiSkip(
  skipNetworks(['sepolia']), // until fx-portal is supported on amoy
  skipChainTypesExceptFor('ethereum'),
);
module.exports.tags = ['ERC20', 'PolygonFxPortal'];
module.exports.dependencies = ['ForwarderRegistry@4.1_deploy'];
