const {ethers} = require('hardhat');
const {getContractAddressOrFallback} = require('../../../src/helpers/templates');
const Contract_deploy = require('../../../src/templates/Contract/deploy');

module.exports = Contract_deploy('TokenMetadataResolverRandomizedReveal@3.0', {
  contract: 'TokenMetadataResolverRandomizedReveal',
  importPath: 'node_modules/@animoca/ethereum-contracts-3.0/artifacts',
  args: [
    {name: 'Chainlink_LinkToken', value: getContractAddressOrFallback('Chainlink_LinkToken', ethers.ZeroAddress)},
    {name: 'Chainlink_VRFV2Wrapper', value: getContractAddressOrFallback('Chainlink_VRFV2Wrapper', ethers.ZeroAddress)},
  ],
  deterministicDeployment: true,
});
module.exports.tags = ['TokenMetadata'];
