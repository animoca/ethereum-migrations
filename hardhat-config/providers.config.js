module.exports = {
  providers: {
    infura: {
      mainnet: '{{PROVIDER_URL_INFURA_MAINNET}}',
      sepolia: '{{PROVIDER_URL_INFURA_SEPOLIA}}',
      matic: '{{PROVIDER_URL_INFURA_MATIC}}',
      amoy: '{{PROVIDER_URL_INFURA_AMOY}}',
      arb1: '{{PROVIDER_URL_INFURA_ARB1}}',
      arbsepolia: '{{PROVIDER_URL_INFURA_ARBSEPOLIA}}',
      base: '{{PROVIDER_URL_INFURA_BASE}}',
      basesepolia: '{{PROVIDER_URL_INFURA_BASESEPOLIA}}',
    },
    alchemy: {
      mainnet: '{{PROVIDER_URL_ALCHEMY_MAINNET}}',
      sepolia: '{{PROVIDER_URL_ALCHEMY_SEPOLIA}}',
      matic: '{{PROVIDER_URL_ALCHEMY_MATIC}}',
      amoy: '{{PROVIDER_URL_ALCHEMY_AMOY}}',
      arb1: '{{PROVIDER_URL_ALCHEMY_ARB1}}',
      arbsepolia: '{{PROVIDER_URL_ALCHEMY_ARBSEPOLIA}}',
      base: '{{PROVIDER_URL_ALCHEMY_BASE}}',
      basesepolia: '{{PROVIDER_URL_ALCHEMY_BASESEPOLIA}}',
    },
    maticvigil: {
      matic: '{{PROVIDER_URL_MATICVIGIL_MATIC}}',
    },
    binance: {
      bsc: 'https://bsc-dataseed.binance.org/',
      bsctest: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    },
    exchain: {
      okex: 'https://exchainrpc.okex.org',
      // okextest: 'https://exchaintestrpc.okex.org',
    },
    arbitrum: {
      arb1: 'https://arb1.arbitrum.io/rpc',
      arbsepolia: 'https://sepolia-rollup.arbitrum.io/rpc',
    },
    sepolia: {
      sepolia: 'https://rpc.sepolia.dev',
    },
  },
};
