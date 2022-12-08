const Contract_deploy = require('../../src/templates/Contract/deploy');

module.exports = Contract_deploy('InterfaceDetectionFacet@0.3.1', {
  contract: 'InterfaceDetectionFacet',
  importPath: 'node_modules/@animoca/ethereum-contracts-0.3.1/artifacts',
  deterministicDeployment: true,
});
module.exports.tags = ['Introspection'];
