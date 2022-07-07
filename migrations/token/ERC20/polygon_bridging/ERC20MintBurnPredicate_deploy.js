const Contract_deploy = require('../../../../src/templates/Contract/deploy');
const {getNamedAccount} = require('../../../../src/helpers/templates');

module.exports = Contract_deploy('ERC20MintBurnPredicate', {
  contract: 'ERC20MintBurnPredicate',
  args: [{name: 'RootChainManager', value: getNamedAccount('Polygon_RootChainManager_Proxy')}],
});
module.exports.tags = ['ERC20', 'PolygonPredicates'];
