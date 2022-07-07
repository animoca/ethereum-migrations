function getNamedAccount(account) {
  return async (hre) => {
    const address = (await hre.getNamedAccounts())[account];
    // hre.deployments.log(`Retrieved address for named account ${account}: ${address}`);
    return address;
  };
}

function getNamedGroups(...groups) {
  return async (hre) => {
    const addresses = [];
    for (const group of groups) {
      addresses.push(...hre.namedGroups[group]);
      // hre.deployments.log(`Retrieved addresses for named group ${group}: ${addresses}`);
    }
    return addresses;
  };
}

function getContractAddress(deployment) {
  return async (hre) => {
    const address = (await hre.deployments.get(deployment)).address;
    // hre.deployments.log(`Retrieved address for deployment ${deployment}: ${address}`);
    return address;
  };
}

module.exports = {
  getNamedAccount,
  getNamedGroups,
  getContractAddress,
};
