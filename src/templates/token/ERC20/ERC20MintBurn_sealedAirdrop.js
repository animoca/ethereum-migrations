const {ethers} = require('hardhat');
const {templatedMigration, buildArg} = require('../../utils');
const {tryAggregate} = require('../../../helpers/multicall');
const {batchDo, batchDoWhile} = require('../../../helpers/batch');

module.exports = function (erc20ContractName, sealingContractName, sealedAirdrops, options = {}) {
  let airdrops;

  const migration = templatedMigration(async (hre) => {
    const {execute, log} = hre.deployments;

    const [tokenName, tokenSymbol, tokenDecimals] = (
      await tryAggregate('MultiStaticCall@1.0', true, [
        {contractName: erc20ContractName, method: 'name', returnType: 'string'},
        {contractName: erc20ContractName, method: 'symbol', returnType: 'string'},
        {contractName: erc20ContractName, method: 'decimals', returnType: 'uint8'},
      ])
    ).map((result) => result.returnData);

    const erc20Contract = await ethers.getContract(erc20ContractName);
    const erc20ContractAddress = await erc20Contract.getAddress();

    const executeOptions = {
      ...options,
      from: (await hre.getNamedAccounts())[options.from || 'deployer'],
    };
    if (options.log === undefined) executeOptions.log = true;

    if (Array.isArray(airdrops)) {
      for (let i = 0; i < airdrops.length; i++) {
        if (!Array.isArray(airdrops[i].amounts)) {
          const amount = airdrops[i].amounts;
          airdrops[i].amounts = airdrops[i].recipients.map(() => amount);
        }
      }

      await batchDo(
        execute,
        airdrops.map((airdrop) => [
          sealingContractName,
          executeOptions,
          'sealedCall',
          erc20ContractAddress,
          erc20Contract.interface.encodeFunctionData('batchMint', [airdrop.recipients, airdrop.amounts]),
          airdrop.sealId,
        ]),
        `${erc20ContractName}: minting ${tokenName} to recipients`,
      );
    } else {
      if (!Array.isArray(airdrops.amounts)) {
        airdrops.amounts = airdrops.recipients.map(() => airdrops.amounts);
      }

      log(`${erc20ContractName}: minting '${tokenName}':`);
      for (let i = 0; i < airdrops.recipients.length; i++) {
        log(`  ${airdrops.recipients[i]}: ${ethers.formatUnits(airdrops.amounts[i], tokenDecimals)} ${tokenSymbol}`);
      }

      await execute(
        sealingContractName,
        executeOptions,
        'sealedCall',
        erc20ContractAddress,
        erc20Contract.interface.encodeFunctionData('batchMint', [airdrops.recipients, airdrops.amounts]),
        airdrops.sealId,
      );
    }
  });

  migration.skip = async (hre) => {
    const {read, log} = hre.deployments;

    if (Array.isArray(sealedAirdrops)) {
      const sealed = await batchDoWhile(
        read,
        sealedAirdrops.map((sealedAirdrop) => [sealingContractName, {}, 'isSealed', sealedAirdrop.sealId]),
        `${sealingContractName}: retrieving sealing status`,
        (res) => res == true,
      );

      if (sealed.length == sealedAirdrops.length) {
        log(`${sealingContractName}: all sealIds are present, airdrops were already run, skipping...`);
        return true;
      }
      airdrops = [];
      for (const sealedAirdrop of sealedAirdrops) {
        airdrops.push({...sealedAirdrop, recipients: await buildArg(hre, sealedAirdrop.recipients)});
      }
      airdrops = airdrops.slice(sealed.length);
      return false;
    }

    log(`${sealingContractName}: checking sealing status for sealdId ${sealedAirdrops.sealId}...`);
    if (await read(sealingContractName, {}, 'isSealed', sealedAirdrops.sealId)) {
      log(`${sealingContractName}: sealId is present, airdrop was already run, skipping...`);
      return true;
    }
    airdrops = {...sealedAirdrops, recipients: await buildArg(hre, sealedAirdrops.recipients)};
    return false;
  };

  migration.dependencies = ['MultiStaticCall@1.0', `${sealingContractName}_deploy`, `${erc20ContractName}_deploy`];
  return migration;
};
