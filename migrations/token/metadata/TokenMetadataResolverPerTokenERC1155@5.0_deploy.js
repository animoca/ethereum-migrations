const Contract_deploy = require('../../../src/templates/Contract/deploy');

module.exports = Contract_deploy('TokenMetadataResolverPerTokenERC1155@5.0', {
  contract: 'TokenMetadataResolverPerTokenERC1155',
  importPath: 'node_modules/@animoca/ethereum-contracts-5.0/artifacts',
  deterministicDeployment: true,
});
module.exports.tags = ['TokenMetadata'];
