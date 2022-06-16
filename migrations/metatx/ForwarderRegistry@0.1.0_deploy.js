const {deployment} = require('../../src/templates/contracts');

module.exports = deployment('ForwarderRegistry@0.1.0', 'ForwarderRegistry', [], {
  importPath: 'node_modules/@animoca/ethereum-contracts-0.1.0/artifacts',
  deterministicDeployment: true,
});
