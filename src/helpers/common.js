function multiSkip(...skips) {
  return async (hre) => {
    for (const skip of skips) {
      if (await skip(hre)) {
        return true;
      }
    }
    return false;
  };
}

function skipIfDeployed(deploymentName) {
  return async ({deployments}) => {
    const {log} = deployments;
    const deployment = await deployments.getOrNull(deploymentName);
    if (deployment) {
      log(`${deploymentName}: already deployed at ${deployment.address}, skipping...`);
      return true;
    }
    // log(`Contract ${contractName} not found, proceeding...`);
    return false;
  };
}

function skipIfEmptyBytecode(deploymentName) {
  return async ({deployments, ethers}) => {
    const {log} = deployments;
    const deployment = await deployments.get(deploymentName);
    const bytecode = await hre.ethers.provider.getCode(deployment.address);
    if (bytecode == '0x') {
      log(`${deploymentName}: has no bytecode, skipping...`);
      return true;
    }
    return false;
  };
}

function skipNetworks(networks) {
  return async ({network, deployments}) => {
    const {log} = deployments;
    const matchNetwork = network.name === networks || networks.indexOf(network.name) >= 0;
    if (matchNetwork) {
      log(`Network ${network.name} is part of ${networks}, skipping...`);
      return true;
    }
    // log(`Network ${network.name} is not part of ${networks}, proceeding...`);
    return false;
  };
}

function skipNetworksExceptFor(networks) {
  return async ({network, deployments}) => {
    const {log} = deployments;
    const matchNetwork = network.name === networks || networks.indexOf(network.name) >= 0;
    if (matchNetwork) {
      // log(`Network ${network.name} is part of ${networks}, proceeding...`);
      return false;
    }
    log(`Network ${network.name} is not part of ${networks}, skipping...`);
    return true;
  };
}

function skipNetworksTagged(tag) {
  return async ({network, deployments}) => {
    const {log} = deployments;
    if (network.tags[tag]) {
      log(`Network ${network.name} is tagged '${tag}', skipping...`);
      return true;
    }
    // log(`Network ${network.name} is not tagged ${tag}, proceeding...`);
    return false;
  };
}

function skipNetworksNotTagged(tag) {
  return async ({network, deployments}) => {
    const {log} = deployments;
    if (network.tags[tag]) {
      // log(`Network ${network.name} is tagged '${tag}', proceeding...`);
      return false;
    }
    log(`Network ${network.name} is not tagged ${tag}, skipping...`);
    return true;
  };
}

function skipLiveNetworks() {
  return async ({network, deployments}) => {
    const {log} = deployments;
    if (network.live) {
      log(`Network ${network.name} is a live network, skipping...`);
      return true;
    }
    // log(`Network ${network.name} is not live, proceeding...`);
    return false;
  };
}

function skipChainTypesExceptFor(chainType) {
  return async ({network, deployments}) => {
    const {log} = deployments;
    if (network.tags['dev'] || network.tags[chainType]) {
      // dev networks never skip
      return false;
    }
    log(`Network is not of chain type '${chainType}', skipping...`);
    return true;
  };
}

module.exports = {
  multiSkip,

  skipIfDeployed,
  skipIfEmptyBytecode,

  skipNetworks,
  skipNetworksExceptFor,

  skipNetworksTagged,
  skipNetworksNotTagged,

  skipLiveNetworks,
  skipChainTypesExceptFor,
};
