const {ethers} = require('hardhat');
const {templatedMigration, buildArg} = require('../../../utils');

const callbackLimit = 40000; // at the time of development, the callback gas usage is ~33000
const nbBlockConfirmations = 3;

module.exports = function (name, resolverName, callbackGasLimit = callbackLimit, blockConfirmations = nbBlockConfirmations, options = {}) {
  let NFTContract, gasPrice;

  const migration = templatedMigration(async (hre) => {
    const {execute, get, read, log} = hre.deployments;
    const {deployer} = await hre.getNamedAccounts();

    const executeOptions = {
      ...options,
      from: (await hre.getNamedAccounts())[options.from || 'deployer'],
    };
    if (options.log === undefined) executeOptions.log = true;

    const callbackGas = await buildArg(hre, callbackGasLimit);
    const confirmations = await buildArg(hre, blockConfirmations);

    const resolver = await get(resolverName);

    log(`Chainlink_LinkToken: approving MaxUint256 to ${resolverName} ...`);
    await execute('Chainlink_LinkToken', executeOptions, 'approve', resolver.address, ethers.constants.MaxUint256);

    // log(`${name}: Estimating Chainlink VRF callback price for callbackGasLimit=${callbackGas} gasPrice=${gasPrice}...`);
    // const requestPrice = await read('Chainlink_VRFV2Wrapper', 'estimateRequestPrice', callbackGas, gasPrice);

    log(`${name}: Revealing tokens blockConfirmations=${confirmations}, callbackGasLimit=${callbackGas}...`);
    // await execute(
    //   'Chainlink_LinkToken',
    //   executeOptions,
    //   'transferAndCall',
    //   resolver.address,
    //   requestPrice,
    //   ethers.utils.defaultAbiCoder.encode(['address', 'uint32', 'uint16'], [NFTContract.address, callbackGas, confirmations])
    // );

    await execute(resolverName, executeOptions, 'revealTokens', NFTContract.address, callbackGas, confirmations);
  });

  migration.skip = async (hre) => {
    const {get, read, log} = hre.deployments;

    const gasPriceIdx = process.argv.indexOf('--gasprice');
    if (gasPriceIdx > -1) {
      gasPrice = process.argv[gasPriceIdx + 1];
    } else {
      throw new Error('You must supply a gas price');
    }

    NFTContract = await get(name);

    log(`${name}: checking the tokens reveal status...`);

    if ((await read(resolverName, {}, 'revealStatus', NFTContract.address)) == 2) {
      log(`${name}: tokens already revealed, skipping...`);
      return true;
    }

    return false;
  };

  migration.tags = [name, `${name}_revealTokens`];
  migration.dependencies = [`${name}_deploy`, `${resolverName}_deploy`];
  return migration;
};
