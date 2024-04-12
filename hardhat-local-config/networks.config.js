module.exports = {
  networks: {
    // Ethereum
    mainnet: {
      defaultProvider: 'alchemy',
    },
    goerli: {
      defaultProvider: 'infura',
    },
    sepolia: {
      defaultProvider: 'infura',
    },

    // Polygon
    matic: {
      defaultProvider: 'alchemy',
    },
    mumbai: {
      defaultProvider: 'infura',
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
    arbgoerli: {
      defaultProvider: 'infura',
    },
  },
};
