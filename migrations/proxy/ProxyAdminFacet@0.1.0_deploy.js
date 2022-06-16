const {deployment} = require('../../src/templates/contracts');
const {getContractAddress} = require('../../src/helpers');

module.exports = deployment(
  'ProxyAdminFacet@0.1.0',
  'ProxyAdminFacet',
  [{name: 'ForwarderRegistry', value: getContractAddress('ForwarderRegistry@0.1.0')}],
  {
    importPath: 'node_modules/@animoca/ethereum-contracts-0.1.0/artifacts',
    deterministicDeployment: true,
    dependencies: ['ForwarderRegistry@0.1.0_deploy'],
  }
);
