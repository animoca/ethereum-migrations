const Contract_deploy = require('../../Contract/deploy');
const {getContractAddress} = require('../../../helpers/templates');

module.exports = function (deploymentName, tokenName, tokenSymbol, tokenDecimals, holders, allocations, options = {}) {
  const migration = Contract_deploy(deploymentName, {
    contract: 'ERC20FixedSupply',
    args: [
      {name: 'name', value: tokenName},
      {name: 'symbol', value: tokenSymbol},
      {name: 'decimals', value: tokenDecimals},
      {name: 'holders', value: holders},
      {name: 'allocations', value: allocations},
      {name: 'ForwarderRegistry', value: getContractAddress('ForwarderRegistry@4.1')},
    ],
    ...options,
  });
  migration.dependencies = ['ForwarderRegistry@4.1_deploy'];
  return migration;
};
