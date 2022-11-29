const Contract_deploy = require('../../../../../src/templates/Contract/deploy');
const {getNamedAccount} = require('../../../../../src/helpers/templates');
const {skipIfChainTypeIsNot} = require('../../../../../src/helpers/common');

module.exports = Contract_deploy('ERC20EscrowPredicate', {
  contract: 'ERC20EscrowPredicate',
  args: [{name: 'RootChainManager', value: getNamedAccount('POSPortal_RootChainManager_Proxy')}],
});
module.exports.skip = skipIfChainTypeIsNot('ethereum');
module.exports.tags = ['ERC20', 'PolygonPOSPortal'];
