module.exports = {
  namedAccounts: {
    deployer: {
      default: 0,
    },

    Polygon_RootChainManager_Proxy: {
      default: '0x0000000000000000000000000000000000000000',
      1: '0xA0c68C638235ee32657e8f720a23ceC1bFc77C77', // ethereum mainnet
      5: '0xBbD7cBFA79faee899Eaf900F13C9065bF03B1A74', // goerli testnet
    },

    Polygon_ChildChainManager_Proxy: {
      default: '0x0000000000000000000000000000000000000000',
      137: '0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa', // polygon mainnet
      80001: '0xb5505a6d998549090530911180f38aC5130101c6', // mumbai testnet
    },
  },
  namedGroups: {},
};
