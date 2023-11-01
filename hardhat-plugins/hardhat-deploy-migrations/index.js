const ethers = require('ethers');
const yesno = require('yesno');
const {extendConfig, subtask} = require('hardhat/config');
const {normalizePath} = require('@animoca/ethereum-contract-helpers/hardhat-plugins/utils');

extendConfig((config, userConfig) => {
  config.paths.generated = normalizePath(config, userConfig.paths ? userConfig.paths.generated : undefined, 'generated');
});

subtask('deploy:runDeploy', async (taskArguments, hre, runSuper) => {
  const chainId = await hre.getChainId();
  const accounts = await hre.network.provider.send('eth_accounts');
  console.log(`Connected to: ${hre.network.config.url}`);
  console.log(`Chain Id ${chainId}, network ${hre.network.name}`);
  console.log(`Signer accounts: [${accounts.slice(0, 3)},...]`);

  if (hre.network.config.live) {
    const proceed = await yesno({
      question: 'This is a live network, do you want to proceed?',
    });
    if (!proceed) {
      process.exit();
    }
  }

  if (hre.network.tags.production) {
    if (taskArguments.gasprice === undefined) {
      console.log('Please provide a --gasprice argument for production networks');
      process.exit();
    }
    const sure = await yesno({
      question: `This is a production network, are you really sure? (gasprice ${ethers.formatUnits(taskArguments.gasprice, 'gwei')} gwei)`,
    });
    if (!sure) {
      process.exit();
    }
  }

  return runSuper(taskArguments);
});
