const Contract_deploy = require('../../../src/templates/Contract/deploy');

module.exports = Contract_deploy('TokenMetadataResolverTwoStepsReveal@3.0', {
  contract: 'TokenMetadataResolverTwoStepsReveal',
  importPath: 'node_modules/@animoca/ethereum-contracts-3.0/artifacts',
  deterministicDeployment: true,
});
module.exports.tags = ['TokenMetadata'];
