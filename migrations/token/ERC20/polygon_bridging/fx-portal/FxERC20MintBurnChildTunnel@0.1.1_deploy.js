const Contract_deploy = require('../../../../../src/templates/Contract/deploy');
const {getNamedAccount, getContractAddress} = require('../../../../../src/helpers/templates');
const {skipIfChainTypeIsNot} = require('../../../../../src/helpers/common');

module.exports = Contract_deploy('FxERC20MintBurnChildTunnel@0.1.2', {
  contract: 'FxERC20MintBurnChildTunnel',
  importPath: 'node_modules/@animoca/ethereum-contracts-bridging-0.1.2/artifacts',
  args: [
    {name: 'FxChild', value: getNamedAccount('FxPortal_FxChild')},
    {name: 'ChildTokenLogic', value: getContractAddress('FxERC20MintBurn@0.1.2')},
    {name: 'ForwarderRegistry', value: getContractAddress('ForwarderRegistry@0.3.1')},
  ],
  deterministicDeployment: true,
});
module.exports.skip = skipIfChainTypeIsNot('polygon');
module.exports.tags = ['ERC20', 'PolygonFxPortal'];
module.exports.dependencies = ['FxERC20MintBurn@0.1.2_deploy', 'ForwarderRegistry@0.3.1_deploy'];
