const {batchDo, batchDoWhile} = require('../../../helpers/batch');
const {templatedMigration, buildArg} = require('../../utils');

module.exports = function (name, role, accounts, options = {}) {
  let revokedRole, revokedAccounts;

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
        revokedAccounts.map((account) => [name, executeOptions, 'revokeRole', revokedRole, account]),
        `${name}: revoking ${role} role`,
      );
    } else {
      log(`${name}: revoking ${role} role from ${revokedAccounts}`);
      await execute(name, executeOptions, 'revokeRole', revokedRole, revokedAccounts);
    }
  });
  migration.skip = async (hre) => {
    const {read, log} = hre.deployments;

    revokedRole = await read(name, `${role}_ROLE`);
    revokedAccounts = await buildArg(hre, accounts);

    log(`${name}: checking ${role} role status for ${revokedAccounts} ...`);

    if (Array.isArray(revokedAccounts)) {
      const revoked = await batchDoWhile(
        read,
        revokedAccounts.map((account) => [name, {}, 'hasRole', revokedRole, account]),
        `${name}: retrieving ${role} role status`,
        (res) => res == false,
      );

      if (revoked.length === revokedAccounts.length) {
        log(`${name}: ${role} role already revoked from all accounts, skipping...`);
        return true;
      }
      revokedAccounts = revokedAccounts.slice(revoked.length);
      return false;
    }

    if (!(await read(name, {}, 'hasRole', revokedRole, revokedAccounts))) {
      log(`${name}: ${revokedAccounts} does not have ${role} role, skipping...`);
      return true;
    }
    return false;
  };
  migration.tags = [`${name}_revokeRole_${role}`];
  migration.dependencies = [`${name}_deploy`];
  return migration;
};
