const {deployment} = require('../../src/templates/contracts');

module.exports = deployment('DiamondCutFacet@0.0.4', 'DiamondCutFacet', [], {
  importPath: 'node_modules/@animoca/ethereum-contracts-0.0.4/artifacts',
});
