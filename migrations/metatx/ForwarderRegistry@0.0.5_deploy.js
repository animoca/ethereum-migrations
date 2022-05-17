const {deployment} = require('../../src/templates/contracts');

module.exports = deployment('ForwarderRegistry@0.0.5', 'ForwarderRegistry', [], {
  importPath: 'node_modules/@animoca/ethereum-contracts-0.0.5/artifacts',
  deterministicDeployment: true,
});
