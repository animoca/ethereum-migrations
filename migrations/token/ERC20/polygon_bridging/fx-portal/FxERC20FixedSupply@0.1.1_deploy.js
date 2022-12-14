const Contract_deploy = require('../../../../../src/templates/Contract/deploy');
const {getContractAddress} = require('../../../../../src/helpers/templates');
const {skipIfChainTypeIsNot} = require('../../../../../src/helpers/common');

module.exports = Contract_deploy('FxERC20FixedSupply@0.1.2', {
  contract: 'FxERC20FixedSupply',
  importPath: 'node_modules/@animoca/ethereum-contracts-bridging-0.1.2/artifacts',
  args: [{name: 'ForwarderRegistry', value: getContractAddress('ForwarderRegistry@0.3.1')}],
  deterministicDeployment: true,
});
module.exports.skip = skipIfChainTypeIsNot('polygon');
module.exports.tags = ['ERC20', 'PolygonFxPortal'];
module.exports.dependencies = ['ForwarderRegistry@0.3.1_deploy'];
