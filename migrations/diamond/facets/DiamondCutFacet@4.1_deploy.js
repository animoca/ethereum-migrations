const Contract_deploy = require('../../../src/templates/Contract/deploy');
const {getContractAddress} = require('../../../src/helpers/templates');

module.exports = Contract_deploy('DiamondCutFacet@4.1', {
  contract: 'DiamondCutFacet',
  importPath: 'node_modules/@animoca/ethereum-contracts-4.1/artifacts',
  args: [{name: 'ForwarderRegistry', value: getContractAddress('ForwarderRegistry@4.1')}],
  deterministicDeployment: true,
});
module.exports.tags = ['Diamond'];
module.exports.dependencies = ['ForwarderRegistry@4.1_deploy'];
