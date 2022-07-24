module.exports = {
  providers: {
    infura: {
      mainnet: '{{PROVIDER_URL_INFURA_MAINNET}}',
      goerli: '{{PROVIDER_URL_INFURA_GOERLI}}',
      polygon: '{{PROVIDER_URL_INFURA_POLYGON}}',
      polygonMumbai: '{{PROVIDER_URL_INFURA_POLYGONMUMBAI}}',
    },
    alchemy: {
      mainnet: '{{PROVIDER_URL_ALCHEMY_MAINNET}}',
      goerli: '{{PROVIDER_URL_ALCHEMY_GOERLI}}',
      polygon: '{{PROVIDER_URL_ALCHEMY_POLYGON}}',
      polygonMumbai: '{{PROVIDER_URL_ALCHEMY_POLYGONMUMBAI}}',
    },
    maticvigil: {
      polygon: '{{PROVIDER_URL_MATICVIGIL_POLYGON}}',
      polygonMumbai: '{{PROVIDER_URL_MATICVIGIL_POLYGONMUMBAI}}',
    },
    binance: {
      bsc: 'https://bsc-dataseed.binance.org/',
      bscTestnet: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    },
    exchain: {
      okex: 'https://exchainrpc.okex.org',
      okexTestnet: 'https://exchaintestrpc.okex.org',
    },
  },
};
