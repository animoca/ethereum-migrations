const Contract_deploy = require('../../../src/templates/Contract/deploy');
const {getContractAddress} = require('../../../src/helpers/templates');

module.exports = Contract_deploy('ERC1155MintableFacet@0.3.1', {
  contract: 'ERC1155MintableFacet',
  importPath: 'node_modules/@animoca/ethereum-contracts-0.3.1/artifacts',
  args: [{name: 'ForwarderRegistry', value: getContractAddress('ForwarderRegistry@0.3.1')}],
  deterministicDeployment: true,
});
module.exports.tags = ['ERC1155'];
module.exports.dependencies = ['ForwarderRegistry@0.3.1_deploy'];
