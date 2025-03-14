const Contract_deploy = require('../../../src/templates/Contract/deploy');

module.exports = Contract_deploy('TokenMetadataResolverPerTokenERC1155@4.1', {
  contract: 'TokenMetadataResolverPerTokenERC1155',
  importPath: 'node_modules/@animoca/ethereum-contracts-4.1/artifacts',
  deterministicDeployment: true,
});
module.exports.tags = ['TokenMetadata'];
