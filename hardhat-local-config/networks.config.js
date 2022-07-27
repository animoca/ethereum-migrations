module.exports = {
  networks: {
    // Ethereum
    mainnet: {
      defaultProvider: 'alchemy',
    },
    goerli: {
      defaultProvider: 'infura',
    },

    // Polygon
    matic: {
      defaultProvider: 'alchemy',
    },
    mumbai: {
      defaultProvider: 'infura',
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
  },
};
