module.exports = {
  networks: {
    // Ethereum
    mainnet: {
      defaultProvider: 'alchemy',
    },
    ropsten: {
      defaultProvider: 'infura',
    },
    rinkeby: {
      defaultProvider: 'infura',
    },
    goerli: {
      defaultProvider: 'infura',
    },
    kovan: {
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
