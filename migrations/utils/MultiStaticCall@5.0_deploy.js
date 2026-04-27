const Contract_deploy = require('../../src/templates/Contract/deploy');

module.exports = Contract_deploy('MultiStaticCall@5.0', {
  contract: 'MultiStaticCall',
  importPath: 'node_modules/@animoca/ethereum-contracts-5.0/artifacts',
  deterministicDeployment: true,
});
module.exports.tags = ['Utils'];
