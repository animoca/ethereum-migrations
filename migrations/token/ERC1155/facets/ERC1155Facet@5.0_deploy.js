const Contract_deploy = require('../../../../src/templates/Contract/deploy');
const {getContractAddress} = require('../../../../src/helpers/templates');

module.exports = Contract_deploy('ERC1155Facet@5.0', {
  contract: 'ERC1155Facet',
  importPath: 'node_modules/@animoca/ethereum-contracts-5.0/artifacts',
  args: [{name: 'ForwarderRegistry', value: getContractAddress('ForwarderRegistry@5.0')}],
  deterministicDeployment: true,
});
module.exports.tags = ['ERC1155'];
module.exports.dependencies = ['ForwarderRegistry@5.0_deploy'];
