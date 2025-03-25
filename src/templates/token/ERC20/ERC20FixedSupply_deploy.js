const Contract_deploy = require('../../Contract/deploy');
const {getContractAddress} = require('../../../helpers/templates');

module.exports = function (deploymentName, tokenName, tokenSymbol, tokenDecimals, holders, allocations, options = {}) {
  const migration = Contract_deploy(deploymentName, {
    ...options,
    contract: 'ERC20FixedSupply',
    args: [
      {name: 'name', value: tokenName},
      {name: 'symbol', value: tokenSymbol},
      {name: 'decimals', value: tokenDecimals},
      {name: 'holders', value: holders},
      {name: 'allocations', value: allocations},
      {name: 'ForwarderRegistry', value: getContractAddress('ForwarderRegistry@4.1')},
    ],
  });
  migration.dependencies = ['ForwarderRegistry@4.1_deploy'];
  return migration;
};
