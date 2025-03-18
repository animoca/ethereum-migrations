const Contract_deploy = require('../../Contract/deploy');
const {getContractAddress} = require('../../../helpers/templates');

module.exports = function (contractName, artifact, tokenName, tokenSymbol, metadataResolver, options = {}) {
  const migration = Contract_deploy(contractName, {
    ...options,
    contract: artifact,
    args: [
      {name: 'name', value: tokenName},
      {name: 'symbol', value: tokenSymbol},
      {name: 'MetadataResolver', value: getContractAddress(metadataResolver)},
      {name: 'OperatorFiltererRegistry', value: getContractAddress('OperatorFilterRegistry')},
      {name: 'ForwarderRegistry', value: getContractAddress('ForwarderRegistry@4.1')},
    ],
  });
  migration.dependencies = [`${metadataResolver}_deploy`, 'ForwarderRegistry@4.1_deploy'];
  return migration;
};
