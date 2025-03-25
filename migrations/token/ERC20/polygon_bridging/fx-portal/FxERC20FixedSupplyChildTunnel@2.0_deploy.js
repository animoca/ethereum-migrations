const Contract_deploy = require('../../../../../src/templates/Contract/deploy');
const {getNamedAccount, getContractAddress} = require('../../../../../src/helpers/templates');
const {skipChainTypesExceptFor} = require('../../../../../src/helpers/common');

module.exports = Contract_deploy('FxERC20FixedSupplyChildTunnel@2.0', {
  contract: 'FxERC20FixedSupplyChildTunnel',
  importPath: 'node_modules/@animoca/ethereum-contracts-bridging-2.0/artifacts',
  args: [
    {name: 'FxChild', value: getNamedAccount('FxPortal_FxChild')},
    {name: 'ChildTokenLogic', value: getContractAddress('FxERC20FixedSupply@2.0')},
    {name: 'ForwarderRegistry', value: getContractAddress('ForwarderRegistry@4.1')},
  ],
  deterministicDeployment: true,
});
module.exports.skip = skipChainTypesExceptFor('polygon');
module.exports.tags = ['ERC20', 'PolygonFxPortal'];
module.exports.dependencies = ['FxERC20FixedSupply@2.0_deploy', 'ForwarderRegistry@4.1_deploy'];
