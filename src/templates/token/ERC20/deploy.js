const Contract_deploy = require('../../Contract/deploy');
const {getContractAddress} = require('../../../helpers/templates');

module.exports = function (name, options = {}) {
  const migration = Contract_deploy(name, {args: [{name: 'ForwarderRegistry', value: getContractAddress('ForwarderRegistry@1.0')}], ...options});
  migration.dependencies = ['ForwarderRegistry@1.0_deploy'];
  return migration;
};
