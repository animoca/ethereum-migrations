const Contract_deploy = require('../../../src/templates/Contract/deploy');
const {getContractAddress} = require('../../../src/helpers/templates');
const {skipNetworksTagged} = require('../../../src/helpers/common');

module.exports = Contract_deploy('TokenMetadataResolverRandomizedReveal@3.0', {
  contract: 'TokenMetadataResolverRandomizedReveal',
  importPath: 'node_modules/@animoca/ethereum-contracts-3.0/artifacts',
  args: [
    {name: 'Chainlink_LinkToken', value: getContractAddress('Chainlink_LinkToken')},
    {name: 'Chainlink_VRFV2Wrapper', value: getContractAddress('Chainlink_VRFV2Wrapper')},
  ],
  deterministicDeployment: true,
});
module.exports.skip = skipNetworksTagged(['dev']);
module.exports.tags = ['TokenMetadata'];
