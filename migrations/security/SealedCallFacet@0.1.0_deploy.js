const Contract_deploy = require('../../src/templates/Contract/deploy');
const {getContractAddress} = require('../../src/helpers/templates');

module.exports = Contract_deploy('SealedCallFacet@0.1.0', {
  contract: 'SealedCallFacet',
  importPath: 'node_modules/@animoca/ethereum-contracts-0.1.0/artifacts',
  args: [{name: 'ForwarderRegistry', value: getContractAddress('ForwarderRegistry@0.1.0')}],
  deterministicDeployment: true,
});
module.exports.tags = ['Security'];
module.exports.dependencies = ['ForwarderRegistry@0.1.0_deploy'];
