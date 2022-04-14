const {extendConfig, subtask} = require('hardhat/config');

extendConfig((config, userConfig) => {
  if (userConfig.namedGroups) {
    config.namedGroups = userConfig.namedGroups;
  } else {
    config.namedGroups = {};
  }
});

subtask('deploy:runDeploy', async (taskArguments, hre, runSuper) => {
  const namedAccounts = await hre.getNamedAccounts();
  hre.namedGroups = Object.fromEntries(
    Object.entries(hre.config.namedGroups).map(([team, members]) => [
      team,
      members.map((member) => namedAccounts[member]), // todo explicit retrieval fail?
    ])
  );
  await runSuper(taskArguments);
});
