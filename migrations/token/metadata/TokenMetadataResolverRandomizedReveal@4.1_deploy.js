const {ethers} = require('hardhat');
const {getContractAddressOrFallback} = require('../../../src/helpers/templates');
const Contract_deploy = require('../../../src/templates/Contract/deploy');
const {skipNetworksTagged} = require('../../../src/helpers/common');

module.exports = Contract_deploy('TokenMetadataResolverRandomizedReveal@4.1', {
  contract: 'TokenMetadataResolverRandomizedReveal',
  importPath: 'node_modules/@animoca/ethereum-contracts-4.1/artifacts',
  args: [
    {name: 'Chainlink_LinkToken', value: getContractAddressOrFallback('Chainlink_LinkToken', ethers.ZeroAddress)},
    {name: 'Chainlink_VRFV2Wrapper', value: getContractAddressOrFallback('Chainlink_VRFV2Wrapper', ethers.ZeroAddress)},
  ],
  deterministicDeployment: true,
});
module.exports.tags = ['TokenMetadata'];
module.exports.skip = skipNetworksTagged('base');
