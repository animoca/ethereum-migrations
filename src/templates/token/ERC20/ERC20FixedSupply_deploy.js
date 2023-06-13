const Contract_deploy = require('../../Contract/deploy');
const {getContractAddress} = require('../../../helpers/templates');

module.exports = function (contractName, tokenName, tokenSymbol, tokenDecimals, holders, allocations, options = {}) {
  const migration = Contract_deploy(contractName, {
    contract: 'ERC20FixedSupply',
    args: [
      {name: 'name', value: tokenName},
      {name: 'symbol', value: tokenSymbol},
      {name: 'decimals', value: tokenDecimals},
      {name: 'holders', value: holders},
      {name: 'allocations', value: allocations},
      {name: 'ForwarderRegistry', value: getContractAddress('ForwarderRegistry@1.0')},
    ],
    ...options,
  });
  migration.dependencies = ['ForwarderRegistry@1.0_deploy'];
  return migration;
};
