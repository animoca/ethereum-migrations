const Contract_deploy = require('../../../../../src/templates/Contract/deploy');
const {getContractAddress} = require('../../../../../src/helpers/templates');
const {skipChainTypesExceptFor} = require('../../../../../src/helpers/common');

module.exports = Contract_deploy('FxERC20MintBurn@0.3', {
  contract: 'FxERC20MintBurn',
  importPath: 'node_modules/@animoca/ethereum-contracts-bridging-0.3/artifacts',
  args: [{name: 'ForwarderRegistry', value: getContractAddress('ForwarderRegistry@1.0')}],
  deterministicDeployment: true,
});
module.exports.skip = skipChainTypesExceptFor('polygon');
module.exports.tags = ['ERC20', 'PolygonFxPortal'];
module.exports.dependencies = ['ForwarderRegistry@1.0_deploy'];
