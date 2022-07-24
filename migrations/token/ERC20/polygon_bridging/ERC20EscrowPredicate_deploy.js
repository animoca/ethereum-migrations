const Contract_deploy = require('../../../../src/templates/Contract/deploy');
const {getNamedAccount} = require('../../../../src/helpers/templates');

module.exports = Contract_deploy('ERC20EscrowPredicate', {
  contract: 'ERC20EscrowPredicate',
  args: [{name: 'RootChainManager', value: getNamedAccount('Polygon_RootChainManager_Proxy')}],
});
module.exports.tags = ['ERC20', 'PolygonPredicates'];
