const Contract_deploy = require('../../src/templates/Contract/deploy');
const {getContractAddress} = require('../../src/helpers/templates');

module.exports = Contract_deploy('AccessControlFacet@0.3.0', {
  contract: 'AccessControlFacet',
  importPath: 'node_modules/@animoca/ethereum-contracts-0.3.0/artifacts',
  args: [{name: 'ForwarderRegistry', value: getContractAddress('ForwarderRegistry@0.3.0')}],
  deterministicDeployment: true,
});
module.exports.tags = ['Access'];
module.exports.dependencies = ['ForwarderRegistry@0.3.0_deploy'];
