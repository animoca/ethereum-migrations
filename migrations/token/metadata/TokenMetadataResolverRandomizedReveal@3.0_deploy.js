const {getContractAddressOrZero} = require('../../../src/helpers/templates');
const Contract_deploy = require('../../../src/templates/Contract/deploy');

module.exports = Contract_deploy('TokenMetadataResolverRandomizedReveal@3.0', {
  contract: 'TokenMetadataResolverRandomizedReveal',
  importPath: 'node_modules/@animoca/ethereum-contracts-3.0/artifacts',
  args: [
    {name: 'Chainlink_LinkToken', value: getContractAddressOrZero('Chainlink_LinkToken')},
    {name: 'Chainlink_VRFV2Wrapper', value: getContractAddressOrZero('Chainlink_VRFV2Wrapper')},
  ],
  deterministicDeployment: true,
});
module.exports.tags = ['TokenMetadata'];
