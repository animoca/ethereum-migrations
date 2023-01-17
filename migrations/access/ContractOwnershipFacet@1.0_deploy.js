const Contract_deploy = require('../../src/templates/Contract/deploy');
const {getContractAddress} = require('../../src/helpers/templates');

module.exports = Contract_deploy('ContractOwnershipFacet@1.0', {
  contract: 'ContractOwnershipFacet',
  importPath: 'node_modules/@animoca/ethereum-contracts-1.0/artifacts',
  args: [{name: 'ForwarderRegistry', value: getContractAddress('ForwarderRegistry@1.0')}],
  deterministicDeployment: true,
});
module.exports.tags = ['Access'];
module.exports.dependencies = ['ForwarderRegistry@1.0_deploy'];
