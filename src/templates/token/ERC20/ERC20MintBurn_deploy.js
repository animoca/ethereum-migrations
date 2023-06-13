const Contract_deploy = require('../../Contract/deploy');
const {getContractAddress} = require('../../../helpers/templates');

module.exports = function (contractName, tokenName, tokenSymbol, tokenDecimals, options = {}) {
  const migration = Contract_deploy(contractName, {
    contract: 'ERC20MintBurn',
    args: [
      {name: 'name', value: tokenName},
      {name: 'symbol', value: tokenSymbol},
      {name: 'decimals', value: tokenDecimals},
      {name: 'ForwarderRegistry', value: getContractAddress('ForwarderRegistry@1.0')},
    ],
    ...options,
  });
  migration.dependencies = ['ForwarderRegistry@1.0_deploy'];
  return migration;
};
