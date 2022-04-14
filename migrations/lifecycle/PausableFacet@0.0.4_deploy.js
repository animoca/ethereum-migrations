const {deployment} = require('../../src/templates/contracts');
const {getContractAddress} = require('../../src/helpers');

module.exports = deployment(
  'PausableFacet@0.0.4',
  'PausableFacet',
  [{name: 'ForwarderRegistry', value: getContractAddress('ForwarderRegistry@0.0.4')}],
  {
    importPath: 'node_modules/@animoca/ethereum-contracts-0.0.4/artifacts',
    dependencies: ['ForwarderRegistry@0.0.4_deploy'],
  }
);
