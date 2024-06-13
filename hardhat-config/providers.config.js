module.exports = {
  providers: {
    infura: {
      mainnet: '{{PROVIDER_URL_INFURA_MAINNET}}',
      goerli: '{{PROVIDER_URL_INFURA_GOERLI}}',
      sepolia: '{{PROVIDER_URL_INFURA_SEPOLIA}}',
      matic: '{{PROVIDER_URL_INFURA_MATIC}}',
      mumbai: '{{PROVIDER_URL_INFURA_MUMBAI}}',
      amoy: '{{PROVIDER_URL_INFURA_AMOY}}',
      arb1: '{{PROVIDER_URL_INFURA_ARB1}}',
      arbgoerli: '{{PROVIDER_URL_INFURA_ARBGOERLI}}',
      arbsepolia: '{{PROVIDER_URL_ALCHEMY_ARBSEPOLIA}}',
    },
    alchemy: {
      mainnet: '{{PROVIDER_URL_ALCHEMY_MAINNET}}',
      goerli: '{{PROVIDER_URL_ALCHEMY_GOERLI}}',
      sepolia: '{{PROVIDER_URL_ALCHEMY_SEPOLIA}}',
      matic: '{{PROVIDER_URL_ALCHEMY_MATIC}}',
      mumbai: '{{PROVIDER_URL_ALCHEMY_MUMBAI}}',
      amoy: '{{PROVIDER_URL_ALCHEMY_AMOY}}',
      arb1: '{{PROVIDER_URL_ALCHEMY_ARB1}}',
      arbgoerli: '{{PROVIDER_URL_ALCHEMY_ARBGOERLI}}',
      arbsepolia: '{{PROVIDER_URL_INFURA_ARBSEPOLIA}}',
    },
    maticvigil: {
      matic: '{{PROVIDER_URL_MATICVIGIL_MATIC}}',
      mumbai: '{{PROVIDER_URL_MATICVIGIL_MUMBAI}}',
    },
    binance: {
      bsc: 'https://bsc-dataseed.binance.org/',
      bsctest: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    },
    exchain: {
      okex: 'https://exchainrpc.okex.org',
      okextest: 'https://exchaintestrpc.okex.org',
    },
    arbitrum: {
      arb1: 'https://arb1.arbitrum.io/rpc',
      arbgoerli: 'https://goerli-rollup.arbitrum.io/rpc',
    },
    sepolia: {
      sepolia: 'https://rpc.sepolia.dev',
    },
  },
};
