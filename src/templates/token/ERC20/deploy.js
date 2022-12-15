const Contract_deploy = require('../../Contract/deploy');
const {getContractAddress} = require('../../../helpers/templates');

module.exports = function (name, options = {}) {
  const migration = Contract_deploy(name, {args: [{name: 'ForwarderRegistry', value: getContractAddress('ForwarderRegistry@0.3.1')}], ...options});
  migration.dependencies = ['ForwarderRegistry@0.3.1_deploy'];
  return migration;
};
