const {deployment} = require('../../src/templates/contracts');

module.exports = deployment('ProxyAdminFacet@0.0.4', 'ProxyAdminFacet', [], {
  importPath: 'node_modules/@animoca/ethereum-contracts-0.0.4/artifacts',
});
