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

function skipIfContractExists(contractName) {
  return async ({deployments}) => {
    const {log} = deployments;
    const contract = await deployments.getOrNull(contractName);
    if (contract) {
      log(`${contractName}: already deployed at ${contract.address}, skipping...`);
      return true;
    }
    // log(`Contract ${contractName} not found, proceeding...`);
    return false;
  };
}

function skipIfContractHasNoBytecode(contractName) {
  return async ({deployments, ethers}) => {
    const {log} = deployments;
    const contract = await deployments.get(contractName);
    const bytecode = await hre.ethers.provider.getCode(contract.address);
    if (bytecode == '0x') {
      log(`${contractName}: has no bytecode, skipping...`);
      return true;
    }
    return false;
  };
}

function skipIfChainIdIs(chainIds) {
  return async ({getChainId, deployments}) => {
    const {log} = deployments;
    const chainId = await getChainId();
    const matchChainId = chainIds === chainId || chainIds.indexOf(chainId) >= 0;
    if (matchChainId) {
      log(`${chainId}: restricted chainId, skipping...`);
      return true;
    }
    // log(`Chain id ${chainId} is not part of ${chainIds}, proceeding...`);
    return false;
  };
}

function skipIfChainIdIsNot(chainIds) {
  return async ({getChainId, deployments}) => {
    const {log} = deployments;
    const chainId = await getChainId();
    const matchChainId = chainIds === chainId || chainIds.indexOf(chainId) >= 0;
    if (matchChainId) {
      // log(`Chain id ${chainId} is part of ${chainIds}, proceeding...`);
      return false;
    }
    log(`${chainId}: not part of chainIds ${chainIds}, skipping...`);
    return true;
  };
}

function skipIfNetworkIs(networks) {
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

function skipIfNetworkIsNot(networks) {
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

function skipIfNetworkIsTagged(tag) {
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

function skipIfNetworkIsNotTagged(tag) {
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

function skipIfNetworkIsLive() {
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

function skipIfChainTypeIsNot(chainType) {
  return async ({network, deployments}) => {
    const {log} = deployments;
    if (network.name.startsWith('hardhat') || network.name.startsWith('localhost')) {
      // dev networks never skip
      return false;
    }
    if (network.tags[chainType]) {
      return false;
    }
    log(`Network is not of chain type '${chainType}', skipping...`);
    return true;
  };
}

module.exports = {
  multiSkip,
  skipIfContractExists,
  skipIfContractHasNoBytecode,
  skipIfChainIdIs,
  skipIfChainIdIsNot,
  skipIfNetworkIs,
  skipIfNetworkIsNot,
  skipIfNetworkIsTagged,
  skipIfNetworkIsNotTagged,
  skipIfNetworkIsLive,
  skipIfChainTypeIsNot,
};
