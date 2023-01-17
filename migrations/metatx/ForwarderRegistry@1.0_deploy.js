const Contract_deploy = require('../../src/templates/Contract/deploy');

module.exports = Contract_deploy('ForwarderRegistry@1.0', {
  contract: 'ForwarderRegistry',
  importPath: 'node_modules/@animoca/ethereum-contracts-1.0/artifacts',
  deterministicDeployment: true,
});
module.exports.tags = ['Metatx'];
