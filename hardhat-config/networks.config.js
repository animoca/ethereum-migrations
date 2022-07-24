module.exports = {
  networks: {
    //----------------------------//
    //        DEVELOPMENT         //
    //----------------------------//
    hardhat: {
      // chainId 31337
      live: false,
      tags: ['dev'],
      companionNetworks: {
        ethereum: 'hardhat',
        polygon: 'hardhat',
        bsc: 'hardhat',
        okex: 'hardhat',
      },
    },
    localhost: {
      // chainId 1337
      live: false,
      tags: ['dev'],
      companionNetworks: {
        ethereum: 'localhost',
        polygon: 'localhost',
        bsc: 'localhost',
        okex: 'localhost',
      },
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
      companionNetworks: {
        polygon: 'polygon',
        bsc: 'bsc',
        okex: 'okex',
      },
    },

    // Staging
    goerli: {
      // chainId 5
      url: 'goerli',
      live: true,
      tags: ['staging', 'ethereum'],
      companionNetworks: {
        polygon: 'polygonMumbai',
        bsc: 'bscTestnet',
        okex: 'okexTestnet',
      },
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
      companionNetworks: {
        ethereum: 'mainnet',
      },
    },

    // Staging
    polygonMumbai: {
      // chainId 80001
      // https://static.matic.network/network/testnet/mumbai/index.json
      url: 'polygonMumbai',
      live: true,
      tags: ['staging', 'polygon'],
      companionNetworks: {
        ethereum: 'goerli',
      },
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
      companionNetworks: {
        ethereum: 'mainnet',
      },
    },

    // Staging
    bscTestnet: {
      // chainId 97
      url: 'bscTestnet',
      live: true,
      tags: ['staging', 'bsc'],
      companionNetworks: {
        ethereum: 'goerli',
      },
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
      companionNetworks: {
        ethereum: 'mainnet',
      },
    },

    okexTestnet: {
      // chainId 65
      // https://okexchain-docs.readthedocs.io/en/latest/developers/quick-start.html
      url: 'okexTestnet',
      live: true,
      tags: ['staging', 'okex'],
      companionNetworks: {
        ethereum: 'goerli',
      },
    },
  },
};
