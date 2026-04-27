const Contract_deploy = require('../../../src/templates/Contract/deploy');
const {getContractAddress} = require('../../../src/helpers/templates');

module.exports = Contract_deploy('CheckpointsFacet@5.0', {
  contract: 'CheckpointsFacet',
  importPath: 'node_modules/@animoca/ethereum-contracts-5.0/artifacts',
  args: [{name: 'ForwarderRegistry', value: getContractAddress('ForwarderRegistry@5.0')}],
  deterministicDeployment: true,
});
module.exports.tags = ['Lifecycle'];
module.exports.dependencies = ['ForwarderRegistry@5.0_deploy'];
