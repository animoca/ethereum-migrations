module.exports = {
  namedAccounts: {
    deployer: {
      default: 0,
    },

    POSPortal_RootChainManager_Proxy: {
      default: '0x0000000000000000000000000000000000000000',
      mainnet: '0xA0c68C638235ee32657e8f720a23ceC1bFc77C77',
    },

    POSPortal_ChildChainManager_Proxy: {
      default: '0x0000000000000000000000000000000000000000',
      matic: '0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa',
    },

    FxPortal_FxRoot: {
      default: 0,
      mainnet: '0xfe5e5D361b2ad62c541bAb87C45a0B9B018389a2',
    },

    FxPortal_FxChild: {
      default: 0,
      matic: '0x8397259c983751DAf40400790063935a11afa28a',
    },

    FxPortal_CheckpointManager: {
      default: '0x0000000000000000000000000000000000000000',
      mainnet: '0x86E4Dc95c7FBdBf52e33D563BbDB00823894C287',
    },

    OpenSea_OperatorFilter_Subscription: {
      default: '0x3cc6CddA760b79bAfa08dF41ECFA224f810dCeB6',
    },
  },
  namedGroups: {},
};
