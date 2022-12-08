const Contract_deploy = require('../../src/templates/Contract/deploy');

module.exports = Contract_deploy('MultiStaticCall@0.3.1', {
  contract: 'MultiStaticCall',
  importPath: 'node_modules/@animoca/ethereum-contracts-0.3.1/artifacts',
  deterministicDeployment: true,
});
module.exports.tags = ['Utils'];
