const {deployment} = require('../../src/templates/contracts');
const {getContractAddress} = require('../../src/helpers');

module.exports = deployment('InterfaceDetectionFacet@0.1.0', 'InterfaceDetectionFacet', [], {
  importPath: 'node_modules/@animoca/ethereum-contracts-0.1.0/artifacts',
  deterministicDeployment: true,
  dependencies: ['ForwarderRegistry@0.1.0_deploy'],
});
