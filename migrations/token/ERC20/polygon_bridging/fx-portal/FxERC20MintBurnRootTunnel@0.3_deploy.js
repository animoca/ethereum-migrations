const Contract_deploy = require('../../../../../src/templates/Contract/deploy');
const {getNamedAccount, getContractAddress} = require('../../../../../src/helpers/templates');
const {skipChainTypesExceptFor} = require('../../../../../src/helpers/common');

module.exports = Contract_deploy('FxERC20MintBurnRootTunnel@0.3', {
  contract: 'FxERC20MintBurnRootTunnel',
  importPath: 'node_modules/@animoca/ethereum-contracts-bridging-0.3/artifacts',
  args: [
    {name: 'CheckpointManager', value: getNamedAccount('FxPortal_CheckpointManager')},
    {name: 'FxRoot', value: getNamedAccount('FxPortal_FxRoot')},
    {name: 'ChildTokenLogic', value: async (hre) => (await hre.companionNetworks['polygon'].deployments.get('FxERC20MintBurn@0.3')).address},
    {name: 'ForwarderRegistry', value: getContractAddress('ForwarderRegistry@1.0')},
  ],
  deterministicDeployment: true,
});
module.exports.skip = skipChainTypesExceptFor('ethereum');
module.exports.tags = ['ERC20', 'PolygonFxPortal'];
module.exports.dependencies = ['ForwarderRegistry@1.0_deploy'];
