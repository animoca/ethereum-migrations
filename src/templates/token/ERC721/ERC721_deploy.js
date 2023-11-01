const Contract_deploy = require('../../Contract/deploy');
const {getContractAddress} = require('../../../helpers/templates');

module.exports = function (contractName, artifact, tokenName, tokenSymbol, metadataResolver, options = {}) {
  const migration = Contract_deploy(contractName, {
    contract: artifact,
    args: [
      {name: 'name', value: tokenName},
      {name: 'symbol', value: tokenSymbol},
      {name: 'MetadataResolver', value: getContractAddress(metadataResolver)},
      {name: 'OperatorFiltererRegistry', value: getContractAddress('OperatorFilterRegistry')},
      {name: 'ForwarderRegistry', value: getContractAddress('ForwarderRegistry@1.0')},
    ],
    ...options,
  });
  migration.dependencies = [`${metadataResolver}_deploy`, 'ForwarderRegistry@1.0_deploy'];
  return migration;
};
