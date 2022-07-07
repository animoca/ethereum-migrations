const {constants, utils} = require('ethers');
const {templatedMigration, buildArg} = require('../utils');
const {tryAggregate} = require('../../../src/helpers/multicall');

module.exports = function (name, initialHolders, initialAmountsOrAmount, options = {}) {
  const migration = templatedMigration(async (hre) => {
    const {execute, log} = hre.deployments;

    const [tokenName, tokenSymbol, tokenDecimals] = (
      await tryAggregate('MultiStaticCall@0.1.0', true, [
        {contractName: name, method: 'name', returnType: 'string'},
        {contractName: name, method: 'symbol', returnType: 'string'},
        {contractName: name, method: 'decimals', returnType: 'uint8'},
      ])
    ).map((result) => result.returnData);

    const holders = await buildArg(hre, initialHolders);
    let amounts = await buildArg(hre, initialAmountsOrAmount);
    if (!Array.isArray(amounts)) {
      amounts = holders.map(() => amounts);
    }

    log(`${name}: delivering '${tokenName}' initial airdrop:`);
    for (let i = 0; i < holders.length; i++) {
      log(`  ${holders[i]}: ${utils.formatUnits(amounts[i], tokenDecimals)} ${tokenSymbol}`);
    }

    const executeOptions = {
      ...options,
      from: (await hre.getNamedAccounts())[options.from || 'deployer'],
    };
    if (options.log === undefined) executeOptions.log = true;

    await execute(name, executeOptions, 'batchMint', holders, amounts);
  });

  migration.skip = async (hre) => {
    const {read, log} = hre.deployments;

    log(`${name}: checking the token totalSupply...`);

    const supply = await read(name, {}, 'totalSupply');

    if (!supply.eq(constants.Zero)) {
      log(`${name}: initial airdrop already done, skipping...`);
      return true;
    }

    return false;
  };

  migration.tags = [name, `${name}_initialAirdrop`];
  migration.dependencies = ['MultiStaticCall@0.1.0', `${name}_deploy`];
  return migration;
};
