const {deployment} = require('../../src/templates/contracts');

module.exports = deployment('DiamondLoupeFacet@0.0.4', 'DiamondLoupeFacet', [], {
  importPath: 'node_modules/@animoca/ethereum-contracts-0.0.4/artifacts',
});
