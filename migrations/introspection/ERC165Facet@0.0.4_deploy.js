const {deployment} = require('../../src/templates/contracts');

module.exports = deployment('ERC165Facet@0.0.4', 'ERC165Facet', [], {
  importPath: 'node_modules/@animoca/ethereum-contracts-0.0.4/artifacts',
});
