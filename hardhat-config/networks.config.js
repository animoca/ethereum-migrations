module.exports = {
  networks: {
    //----------------------------//
    //        DEVELOPMENT         //
    //----------------------------//
    hardhat: {
      // chainId 31337
      live: false,
      tags: ['dev'],
    },
    localhost: {
      // chainId 1337
      live: false,
      tags: ['dev'],
    },

    //----------------------------//
    //          ETHEREUM          //
    //----------------------------//

    // Production
    mainnet: {
      // chainId 1
      url: 'mainnet',
      live: true,
      tags: ['production', 'ethereum'],
    },

    // Staging
    ropsten: {
      // chainId 3
      url: 'ropsten',
      live: true,
      tags: ['staging', 'ethereum'],
    },
    rinkeby: {
      // chainId 4
      url: 'rinkeby',
      live: true,
      tags: ['staging', 'ethereum'],
    },
    goerli: {
      // chainId 5
      url: 'goerli',
      live: true,
      tags: ['staging', 'ethereum'],
    },
    kovan: {
      // chainId 42
      url: 'kovan',
      live: true,
      tags: ['staging', 'ethereum'],
    },

    //----------------------------//
    //          POLYGON           //
    //----------------------------//

    // Production
    polygon: {
      // chainId 137
      // https://github.com/maticnetwork/static/blob/master/network/mainnet/v1/index.json
      url: 'polygon',
      live: true,
      tags: ['production', 'polygon'],
    },

    // Staging
    polygonMumbai: {
      // chainId 80001
      // https://static.matic.network/network/testnet/mumbai/index.json
      url: 'polygonMumbai',
      live: true,
      tags: ['staging', 'polygon'],
    },

    //----------------------------//
    //    BINANCE SMART CHAIN     //
    //----------------------------//
    // https://docs.binance.org/smart-chain/developer/rpc.html

    // Production
    bsc: {
      // chainId 56
      url: 'bsc',
      live: true,
      tags: ['production', 'bsc'],
    },

    // Staging
    bscTestnet: {
      // chainId 97
      url: 'bscTestnet',
      live: true,
      tags: ['staging', 'bsc'],
    },

    //----------------------------//
    //         OKEX CHAIN         //
    //----------------------------//

    okex: {
      // chainId 66
      // https://okexchain-docs.readthedocs.io/en/latest/developers/quick-start-for-mainnet.html
      url: 'okex',
      live: true,
      tags: ['production', 'okex'],
    },

    okexTestnet: {
      // chainId 65
      // https://okexchain-docs.readthedocs.io/en/latest/developers/quick-start.html
      url: 'okexTestnet',
      live: true,
      tags: ['staging', 'okex'],
    },
  },
};
