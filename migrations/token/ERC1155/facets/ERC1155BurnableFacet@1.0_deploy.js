const Contract_deploy = require('../../../../src/templates/Contract/deploy');
const {getContractAddress} = require('../../../../src/helpers/templates');

module.exports = Contract_deploy('ERC1155BurnableFacet@1.0', {
  contract: 'ERC1155BurnableFacet',
  importPath: 'node_modules/@animoca/ethereum-contracts-1.0/artifacts',
  args: [{name: 'ForwarderRegistry', value: getContractAddress('ForwarderRegistry@1.0')}],
  deterministicDeployment: true,
});
module.exports.tags = ['ERC1155'];
module.exports.dependencies = ['ForwarderRegistry@1.0_deploy'];
