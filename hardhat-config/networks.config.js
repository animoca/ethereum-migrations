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
        arbitrum: 'hardhat',
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
        arbitrum: 'localhost',
      },
    },

    //----------------------------//
    //          ETHEREUM          //
    //----------------------------//

    // Production
    mainnet: {
      // chainId 1
      url: 'http://mainnet',
      live: true,
      tags: ['production', 'ethereum'],
      companionNetworks: {
        polygon: 'matic',
        bsc: 'bsc',
        okex: 'okex',
        arbitrum: 'arb1',
      },
    },

    // Staging
    goerli: {
      // chainId 5
      url: 'http://goerli',
      live: true,
      tags: ['staging', 'ethereum'],
      companionNetworks: {
        polygon: 'mumbai',
        bsc: 'bsctest',
        okex: 'okextest',
        arbitrum: 'arbgoerli',
      },
    },

    // Staging
    sepolia: {
      // chainId 11155111
      url: 'http://sepolia',
      live: true,
      tags: ['staging', 'ethereum'],
      companionNetworks: {
        polygon: 'mumbai',
        bsc: 'bsctest',
        okex: 'okextest',
        arbitrum: 'arbgoerli',
      },
    },

    //----------------------------//
    //          POLYGON           //
    //----------------------------//

    // Production
    matic: {
      // chainId 137
      // https://github.com/maticnetwork/static/blob/master/network/mainnet/v1/index.json
      url: 'http://matic',
      live: true,
      tags: ['production', 'polygon'],
      companionNetworks: {
        ethereum: 'mainnet',
      },
    },

    // Staging
    mumbai: {
      // chainId 80001
      // https://static.matic.network/network/testnet/mumbai/index.json
      url: 'http://mumbai',
      live: true,
      tags: ['staging', 'polygon'],
      companionNetworks: {
        ethereum: 'goerli',
      },
    },

    //Staging
    amoy : {
      url: 'http://amoy',
      live: true,
      tags: ['staging', 'polygon'],
      companionNetworks: {
        ethereum: 'sepolia',
      },
    },

    //----------------------------//
    //    BINANCE SMART CHAIN     //
    //----------------------------//
    // https://docs.binance.org/smart-chain/developer/rpc.html

    // Production
    bsc: {
      // chainId 56
      url: 'http://bsc',
      live: true,
      tags: ['production', 'bsc'],
      companionNetworks: {
        ethereum: 'mainnet',
      },
    },

    // Staging
    bsctest: {
      // chainId 97
      url: 'http://bsctest',
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
      url: 'http://okex',
      live: true,
      tags: ['production', 'okex'],
      companionNetworks: {
        ethereum: 'mainnet',
      },
    },

    okextest: {
      // chainId 65
      // https://okexchain-docs.readthedocs.io/en/latest/developers/quick-start.html
      url: 'http://okextest',
      live: true,
      tags: ['staging', 'okex'],
      companionNetworks: {
        ethereum: 'goerli',
      },
    },

    //----------------------------//
    //          ARBITRUM          //
    //----------------------------//

    arb1: {
      // chainId 42161
      // https://developer.arbitrum.io/public-chains
      url: 'http://arb1',
      live: true,
      tags: ['production', 'arbitrum'],
      companionNetworks: {
        ethereum: 'mainnet',
      },
    },

    arbgoerli: {
      // chainId 421613
      // https://developer.arbitrum.io/public-chains
      url: 'http://arbgoerli',
      live: true,
      tags: ['staging', 'arbitrum'],
      companionNetworks: {
        ethereum: 'goerli',
      },
    },
    
  },
};
