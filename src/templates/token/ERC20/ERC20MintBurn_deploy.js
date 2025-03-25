const Contract_deploy = require('../../Contract/deploy');
const {getContractAddress} = require('../../../helpers/templates');

module.exports = function (contractName, tokenName, tokenSymbol, tokenDecimals, options = {}) {
  const migration = Contract_deploy(contractName, {
    ...options,
    contract: 'ERC20MintBurn',
    args: [
      {name: 'name', value: tokenName},
      {name: 'symbol', value: tokenSymbol},
      {name: 'decimals', value: tokenDecimals},
      {name: 'ForwarderRegistry', value: getContractAddress('ForwarderRegistry@4.1')},
    ],
  });
  migration.dependencies = ['ForwarderRegistry@4.1_deploy'];
  return migration;
};
