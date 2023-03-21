const {batchDo, batchDoWhile} = require('../../../helpers/batch');
const {templatedMigration, buildArg} = require('../../utils');

module.exports = function (name, role, accounts, options = {}) {
  let grantedRole, grantedAccounts;

  const migration = templatedMigration(async (hre) => {
    const {execute, log} = hre.deployments;

    const executeOptions = {
      ...options,
      from: (await hre.getNamedAccounts())[options.from || 'deployer'],
    };
    if (options.log === undefined) executeOptions.log = true;

    if (Array.isArray(grantedAccounts)) {
      await batchDo(
        execute,
        grantedAccounts.map((account) => [name, executeOptions, 'grantRole', grantedRole, account]),
        `${name}: granting ${role} role`
      );
    } else {
      log(`${name}: granting ${role} role to ${grantedAccounts}`);
      await execute(name, executeOptions, 'grantRole', grantedRole, grantedAccounts);
    }
  });
  migration.skip = async (hre) => {
    const {read, log} = hre.deployments;

    grantedRole = await read(name, `${role}_ROLE`);
    grantedAccounts = await buildArg(hre, accounts);

    log(`${name}: checking ${role} role status for ${grantedAccounts} ...`);

    if (Array.isArray(grantedAccounts)) {
      const granted = await batchDoWhile(
        read,
        grantedAccounts.map((account) => [name, {}, 'hasRole', grantedRole, account]),
        `${name}: retrieving ${role} role status`,
        (res) => res == true
      );

      if (granted.length == grantedAccounts.length) {
        log(`${name}: ${role} role already granted to all accounts, skipping...`);
        return true;
      }
      grantedAccounts = grantedAccounts.slice(granted.length);
      return false;
    }

    if (await read(name, {}, 'hasRole', grantedRole, grantedAccounts)) {
      log(`${name}: ${grantedAccounts} already has the ${role} role, skipping...`);
      return true;
    }
    return false;
  };
  migration.tags = [`${name}_grantRole_${role}`];
  migration.dependencies = [`${name}_deploy`];
  return migration;
};
