const {batchDo, batchDoWhile} = require('../../../helpers/batch');
const {templatedMigration, buildArg} = require('../../utils');

module.exports = function (name, role, accounts, options = {}) {
  let revokeRole, revokedAccounts;

  const migration = templatedMigration(async (hre) => {
    const {execute, log} = hre.deployments;

    const executeOptions = {
      ...options,
      from: (await hre.getNamedAccounts())[options.from || 'deployer'],
    };
    if (options.log === undefined) executeOptions.log = true;

    if (Array.isArray(revokedAccounts)) {
      await batchDo(
        execute,
        revokedAccounts.map((account) => [name, executeOptions, 'revokeRole', revokeRole, account]),
        `${name}: revoking ${role} role`
      );
    } else {
      log(`${name}: revoking ${role} role from ${revokedAccounts}`);
      await execute(name, executeOptions, 'revokeRole', revokeRole, revokedAccounts);
    }
  });
  migration.skip = async (hre) => {
    const {read, log} = hre.deployments;

    revokeRole = await read(name, `${role}_ROLE`);
    revokedAccounts = await buildArg(hre, accounts);

    log(`${name}: Checking ${role} role status for ${revokedAccounts} ...`);

    if (Array.isArray(revokedAccounts)) {
      const hasNoGrantedRole = await batchDoWhile(
        read,
        revokedAccounts.map((account) => [name, {}, 'hasRole', revokeRole, account]),
        `${name}: retrieving ${role} role status`,
        (res) => res != true
      );

      if (hasNoGrantedRole.length === revokedAccounts.length) {
        log(`${name}: ${role} role can be revoked from all accounts, revoking...`);
        return true;
      }
      revokedAccounts = revokedAccounts.slice(hasNoGrantedRole.length);
      return false;
    }

    if (await read(name, {}, 'hasRole', revokeRole, revokedAccounts)) {
      log(`${name}: ${revokedAccounts} does have ${role} role, revoking...`);
      return false;
    }
    return true;
  };
  migration.tags = [`${name}_revokeRole_${role}`];
  migration.dependencies = [`${name}_deploy`];
  return migration;
};
