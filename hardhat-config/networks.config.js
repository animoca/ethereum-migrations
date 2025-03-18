const {EndpointId} = require('@layerzerolabs/lz-definitions');

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
      eid: EndpointId.ETHEREUM_V2_MAINNET,
      companionNetworks: {
        base: 'base',
        polygon: 'matic',
        bsc: 'bsc',
        // okex: 'okex',
        arbitrum: 'arb1',
      },
    },

    // Staging
    sepolia: {
      // chainId 11155111
      url: 'http://sepolia',
      live: true,
      tags: ['staging', 'ethereum'],
      eid: EndpointId.SEPOLIA_V2_TESTNET,
      companionNetworks: {
        base: 'basesepolia',
        polygon: 'amoy',
        bsc: 'bsctest',
        // okex: 'okextest',
        arbitrum: 'arbsepolia',
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
      eid: EndpointId.POLYGON_V2_MAINNET,
      companionNetworks: {
        ethereum: 'mainnet',
      },
    },

    //Staging
    amoy: {
      // chainId 80002
      url: 'http://amoy',
      live: true,
      tags: ['staging', 'polygon'],
      eid: EndpointId.AMOY_V2_TESTNET,
      companionNetworks: {
        ethereum: 'sepolia',
      },
      verify: {
        url: 'https://api-amoy.polygonscan.com',
        etherscan: {
          apiUrl: 'https://api-amoy.polygonscan.com',
        },
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
      eid: EndpointId.BSC_V2_MAINNET,
      companionNetworks: {
        ethereum: 'mainnet',
        arbitrum: 'arb1',
      },
    },

    // Staging
    bsctest: {
      // chainId 97
      url: 'http://bsctest',
      live: true,
      tags: ['staging', 'bsc'],
      eid: EndpointId.BSC_V2_TESTNET,
      companionNetworks: {
        ethereum: 'sepolia',
        arbitrum: 'arbsepolia',
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
      eid: EndpointId.OKX_V2_MAINNET,
      companionNetworks: {
        ethereum: 'mainnet',
      },
    },

    // okextest: {
    //   // chainId 65
    //   // https://okexchain-docs.readthedocs.io/en/latest/developers/quick-start.html
    //   url: 'http://okextest',
    //   live: true,
    //   tags: ['staging', 'okex'],
    //   eid: EndpointId.OKX_V2_TESTNET,
    //   companionNetworks: {
    //     ethereum: 'sepolia',
    //   },
    // },

    //----------------------------//
    //          ARBITRUM          //
    //----------------------------//

    arb1: {
      // chainId 42161
      // https://developer.arbitrum.io/public-chains
      url: 'http://arb1',
      live: true,
      tags: ['production', 'arbitrum'],
      eid: EndpointId.ARBITRUM_V2_MAINNET,
      companionNetworks: {
        ethereum: 'mainnet',
        bsc: 'bsc',
      },
    },

    arbsepolia: {
      // chainId 421614
      // https://developer.arbitrum.io/public-chains
      url: 'http://arbsepolia',
      live: true,
      tags: ['staging', 'arbitrum'],
      eid: EndpointId.ARBSEP_V2_TESTNET,
      companionNetworks: {
        ethereum: 'sepolia',
        bsc: 'bsctest',
      },
      verify: {
        url: 'https://api-sepolia.arbiscan.io',
        etherscan: {
          apiUrl: 'https://api-sepolia.arbiscan.io',
        },
      },
    },

    //----------------------------//
    //            BASE            //
    //----------------------------//

    base: {
      // chainId 8453
      url: 'http://base',
      live: true,
      tags: ['production', 'base'],
      eid: EndpointId.BASE_V2_MAINNET,
      companionNetworks: {
        ethereum: 'mainnet',
      },
      verify: {
        url: 'https://api.basescan.org',
        etherscan: {
          apiUrl: 'https://api.basescan.org',
        },
      },
    },

    basesepolia: {
      // chainId 84532
      url: 'http://basesepolia',
      live: true,
      tags: ['staging', 'base'],
      eid: EndpointId.BASESEP_V2_TESTNET,
      companionNetworks: {
        ethereum: 'sepolia',
      },
      verify: {
        url: 'https://api-sepolia.basescan.org',
        etherscan: {
          apiUrl: 'https://api-sepolia.basescan.org',
        },
      },
    },
  },
};
