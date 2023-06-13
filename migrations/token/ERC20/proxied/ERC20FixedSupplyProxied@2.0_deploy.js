const Contract_deploy = require('../../../../src/templates/Contract/deploy');
const {getContractAddress} = require('../../../../src/helpers/templates');

module.exports = Contract_deploy('ERC20FixedSupplyProxied@2.0', {
  contract: 'ERC20FixedSupplyProxied',
  importPath: 'node_modules/@animoca/ethereum-contracts-2.0/artifacts',
  args: [{name: 'ForwarderRegistry', value: getContractAddress('ForwarderRegistry@1.0')}],
  deterministicDeployment: true,
});
module.exports.tags = ['ERC20'];
module.exports.dependencies = ['ForwarderRegistry@1.0_deploy'];
