const {templatedMigration, buildArg} = require('../../../utils');

module.exports = function (tokenName, subscriptionAddress, options = {}) {
  const migration = templatedMigration(async (hre) => {
    const {execute, log} = hre.deployments;

    const executeOptions = {
      ...options,
      from: (await hre.getNamedAccounts())[options.from || 'deployer'],
    };
    if (options.log === undefined) executeOptions.log = true;

    const subscription = await buildArg(hre, subscriptionAddress);
    const token = await get(tokenName);

    log(`OperatorFilterRegistry: registering ${tokenName} and subscribing to ${subscription} ...`);
    await execute('OperatorFilterRegistry', executeOptions, 'registerAndSubscribe', token.address, subscription);
  });

  migration.skip = async (hre) => {
    const {get, read, log} = hre.deployments;

    const token = await get(tokenName);
    log(`OperatorFilterRegistry: checking the registration status for ${tokenName}...`);
    const registered = await read('OperatorFilterRegistry', {}, 'isRegistered', token.address);

    if (registered) {
      log(`OperatorFilterRegistry: ${tokenName} is already registered, skipping...`);
      return true;
    }

    return false;
  };

  migration.tags = [tokenName, `OperatorFilterRegistry_registerAndSubscribe_${tokenName}`];
  migration.dependencies = [`${tokenName}_deploy`];
  return migration;
};
