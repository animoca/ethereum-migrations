const {deployment} = require('../../src/templates/contracts');
const {getContractAddress} = require('../../src/helpers');

module.exports = deployment(
  'CheckpointsFacet@0.0.4',
  'CheckpointsFacet',
  [{name: 'ForwarderRegistry', value: getContractAddress('ForwarderRegistry@0.0.4')}],
  {
    importPath: 'node_modules/@animoca/ethereum-contracts-0.0.4/artifacts',
    dependencies: ['ForwarderRegistry@0.0.4_deploy'],
  }
);
