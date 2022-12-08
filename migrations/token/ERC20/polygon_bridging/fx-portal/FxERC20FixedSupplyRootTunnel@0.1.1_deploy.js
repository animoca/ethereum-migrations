const Contract_deploy = require('../../../../../src/templates/Contract/deploy');
const {getNamedAccount, getContractAddress} = require('../../../../../src/helpers/templates');
const {skipIfChainTypeIsNot} = require('../../../../../src/helpers/common');

module.exports = Contract_deploy('FxERC20FixedSupplyRootTunnel@0.1.1', {
  contract: 'FxERC20FixedSupplyRootTunnel',
  importPath: 'node_modules/@animoca/ethereum-contracts-bridging-0.1.1/artifacts',
  args: [
    {name: 'CheckpointManager', value: getNamedAccount('FxPortal_CheckpointManager')},
    {name: 'FxRoot', value: getNamedAccount('FxPortal_FxRoot')},
    {name: 'ChildTokenLogic', value: async (hre) => (await hre.companionNetworks['polygon'].deployments.get('FxERC20FixedSupply@0.1.1')).address},
    {name: 'ForwarderRegistry', value: getContractAddress('ForwarderRegistry@0.3.1')},
  ],
  deterministicDeployment: true,
});
module.exports.skip = skipIfChainTypeIsNot('polygon');
module.exports.tags = ['ERC20', 'PolygonFxPortal'];
module.exports.dependencies = ['ForwarderRegistry@0.3.1_deploy'];
