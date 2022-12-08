const Contract_deploy = require('../../src/templates/Contract/deploy');
const {getContractAddress} = require('../../src/helpers/templates');

module.exports = Contract_deploy('ProxyAdminFacet@0.3.1', {
  contract: 'ProxyAdminFacet',
  importPath: 'node_modules/@animoca/ethereum-contracts-0.3.1/artifacts',
  args: [{name: 'ForwarderRegistry', value: getContractAddress('ForwarderRegistry@0.3.1')}],
  deterministicDeployment: true,
});
module.exports.tags = ['Proxy'];
module.exports.dependencies = ['ForwarderRegistry@0.3.1_deploy'];
