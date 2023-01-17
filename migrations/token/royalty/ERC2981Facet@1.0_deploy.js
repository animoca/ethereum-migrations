const Contract_deploy = require('../../../src/templates/Contract/deploy');
const {getContractAddress} = require('../../../src/helpers/templates');

module.exports = Contract_deploy('ERC2981Facet@1.0', {
  contract: 'ERC2981Facet',
  importPath: 'node_modules/@animoca/ethereum-contracts-1.0/artifacts',
  args: [{name: 'ForwarderRegistry', value: getContractAddress('ForwarderRegistry@1.0')}],
  deterministicDeployment: true,
});
module.exports.dependencies = ['ForwarderRegistry@1.0_deploy'];
