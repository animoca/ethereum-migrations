const Contract_deploy = require('../../../../../src/templates/Contract/deploy');
const {getContractAddress} = require('../../../../../src/helpers/templates');
const {multiSkip, skipNetworks, skipChainTypesExceptFor} = require('../../../../../src/helpers/common');

module.exports = Contract_deploy('FxERC20FixedSupply@0.3', {
  contract: 'FxERC20FixedSupply',
  importPath: 'node_modules/@animoca/ethereum-contracts-bridging-0.3/artifacts',
  args: [{name: 'ForwarderRegistry', value: getContractAddress('ForwarderRegistry@1.0')}],
  deterministicDeployment: true,
});
module.exports.skip = multiSkip(
  skipNetworks(['amoy']), // until fx-portal is supported
  skipChainTypesExceptFor('polygon'),
);
module.exports.tags = ['ERC20', 'PolygonFxPortal'];
module.exports.dependencies = ['ForwarderRegistry@1.0_deploy'];
