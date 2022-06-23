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
    polygon: {
      defaultProvider: 'alchemy',
    },
    polygonMumbai: {
      defaultProvider: 'infura',
    },

    // BSC
    bsc: {
      defaultProvider: 'binance',
    },
    bscTestnet: {
      defaultProvider: 'binance',
    },

    // OKEx
    okex: {
      defaultProvider: 'exchain',
    },
    okexTestnet: {
      defaultProvider: 'exchain',
    },
  },
};
