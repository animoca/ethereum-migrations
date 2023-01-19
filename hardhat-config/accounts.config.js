module.exports = {
  namedAccounts: {
    deployer: {
      default: 0,
    },

    POSPortal_RootChainManager_Proxy: {
      default: '0x0000000000000000000000000000000000000000',
      1: '0xA0c68C638235ee32657e8f720a23ceC1bFc77C77', // ethereum mainnet
      5: '0xBbD7cBFA79faee899Eaf900F13C9065bF03B1A74', // goerli testnet
    },

    POSPortal_ChildChainManager_Proxy: {
      default: '0x0000000000000000000000000000000000000000',
      137: '0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa', // polygon mainnet
      80001: '0xb5505a6d998549090530911180f38aC5130101c6', // mumbai testnet
    },

    FxPortal_FxRoot: {
      default: 0,
      1: '0xfe5e5D361b2ad62c541bAb87C45a0B9B018389a2', // ethereum mainnet
      5: '0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA', // goerli testnet
    },

    FxPortal_FxChild: {
      default: 0,
      137: '0x8397259c983751DAf40400790063935a11afa28a', // polygon mainnet
      80001: '0xCf73231F28B7331BBe3124B907840A94851f9f11', // mumbai testnet
    },

    FxPortal_CheckpointManager: {
      default: '0x0000000000000000000000000000000000000000',
      1: '0x86E4Dc95c7FBdBf52e33D563BbDB00823894C287', // ethereum mainnet
      5: '0x2890bA17EfE978480615e330ecB65333b880928e', // goerli testnet
    },

    OpenSea_OperatorFilter_Subscription: {
      default: '0x3cc6CddA760b79bAfa08dF41ECFA224f810dCeB6',
    },
  },
  namedGroups: {},
};
