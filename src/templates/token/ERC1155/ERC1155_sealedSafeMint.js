const {ethers} = require('hardhat');
const {templatedMigration, buildArg} = require('@animoca/ethereum-migrations/src/templates/utils');

module.exports = function (erc1155ContractName, sealingContractName, sealedMint, options = {}) {
  let mint;

  const migration = templatedMigration(async (hre) => {
    const {execute, log} = hre.deployments;

    const erc1155Contract = await ethers.getContract(erc1155ContractName);

    const executeOptions = {
      ...options,
      from: (await hre.getNamedAccounts())[options.from || 'deployer'],
    };
    if (options.log === undefined) executeOptions.log = true;

    log(`${erc1155ContractName}: minting recipient=${mint.recipient} tokenId=${mint.tokenId} amount=${mint.amount} data=${mint.data} ...`);

    await execute(
      sealingContractName,
      executeOptions,
      'sealedCall',
      erc1155Contract.address,
      erc1155Contract.interface.encodeFunctionData('safeMint(address,uint256,uint256,bytes)', [mint.recipient, mint.tokenId, mint.amount, mint.data]),
      mint.sealId
    );
  });

  migration.skip = async (hre) => {
    const {read, log} = hre.deployments;

    log(`${sealingContractName}: checking sealing status for sealdId ${sealedMint.sealId}...`);
    if (await read(sealingContractName, {}, 'isSealed', sealedMint.sealId)) {
      log(`${sealingContractName}: sealId is present, mint was already run, skipping...`);
      return true;
    }
    mint = {...sealedMint, recipient: await buildArg(hre, sealedMint.recipient)};
    return false;
  };

  migration.dependencies = [`${sealingContractName}_deploy`, `${erc1155ContractName}_deploy`];
  return migration;
};
