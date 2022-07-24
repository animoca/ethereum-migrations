const Contract_deploy = require('../../src/templates/Contract/deploy');

module.exports = Contract_deploy('InterfaceDetectionFacet@0.1.0', {
  contract: 'InterfaceDetectionFacet',
  importPath: 'node_modules/@animoca/ethereum-contracts-0.1.0/artifacts',
  deterministicDeployment: true,
});
module.exports.tags = ['Introspection'];
