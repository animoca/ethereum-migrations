module.exports = {
  networks: {
    // Ethereum
    mainnet: {
      defaultProvider: 'alchemy',
    },
    sepolia: {
      defaultProvider: 'infura',
    },

    // Polygon
    matic: {
      defaultProvider: 'alchemy',
    },
    amoy: {
      defaultProvider: 'alchemy',
    },

    // BSC
    bsc: {
      defaultProvider: 'binance',
    },
    bsctest: {
      defaultProvider: 'binance',
    },

    // OKEx
    okex: {
      defaultProvider: 'exchain',
    },
    okextest: {
      defaultProvider: 'exchain',
    },

    // Arbitrum
    arb1: {
      defaultProvider: 'alchemy',
    },
    arbsepolia: {
      defaultProvider: 'infura',
    },

    // Base
    base: {
      defaultProvider: 'alchemy',
    },
    basesepolia: {
      defaultProvider: 'infura',
    },
  },
};
