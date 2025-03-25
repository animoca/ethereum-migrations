module.exports = {
  namedAccounts: {
    deployer: {
      default: 0,
    },

    FxPortal_FxRoot: {
      default: 0,
      mainnet: '0xfe5e5D361b2ad62c541bAb87C45a0B9B018389a2',
      sepolia: '0x0E13EBEdDb8cf9f5987512d5E081FdC2F5b0991e',
    },

    FxPortal_FxChild: {
      default: 0,
      matic: '0x8397259c983751DAf40400790063935a11afa28a',
      amoy: '0xE5930336866d0388f0f745A2d9207C7781047C0f',
    },

    FxPortal_CheckpointManager: {
      default: '0x0000000000000000000000000000000000000000',
      mainnet: '0x86E4Dc95c7FBdBf52e33D563BbDB00823894C287',
      sepolia: '0xbd07D7E1E93c8d4b2a261327F3C28a8EA7167209',
    },

    OpenSea_OperatorFilter_Subscription: {
      default: '0x3cc6CddA760b79bAfa08dF41ECFA224f810dCeB6',
    },
  },
  namedGroups: {},
};
