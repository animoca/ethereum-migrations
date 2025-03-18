const Contract_deploy = require('../../../../../src/templates/Contract/deploy');
const {getNamedAccount, getContractAddress} = require('../../../../../src/helpers/templates');
const {multiSkip, skipNetworks, skipChainTypesExceptFor} = require('../../../../../src/helpers/common');

module.exports = Contract_deploy('FxERC20MintBurnChildTunnel@0.3', {
  contract: 'FxERC20MintBurnChildTunnel',
  importPath: 'node_modules/@animoca/ethereum-contracts-bridging-0.3/artifacts',
  args: [
    {name: 'FxChild', value: getNamedAccount('FxPortal_FxChild')},
    {name: 'ChildTokenLogic', value: getContractAddress('FxERC20MintBurn@0.3')},
    {name: 'ForwarderRegistry', value: getContractAddress('ForwarderRegistry@1.0')},
  ],
  deterministicDeployment: true,
});
module.exports.skip = multiSkip(
  skipNetworks(['amoy']), // until fx-portal is supported on amoy
  skipChainTypesExceptFor('polygon'),
);
module.exports.tags = ['ERC20', 'PolygonFxPortal'];
module.exports.dependencies = ['FxERC20MintBurn@0.3_deploy', 'ForwarderRegistry@1.0_deploy'];
