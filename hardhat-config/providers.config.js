module.exports = {
  providers: {
    infura: {
      mainnet: '{{PROVIDER_URL_INFURA_MAINNET}}',
      goerli: '{{PROVIDER_URL_INFURA_GOERLI}}',
      matic: '{{PROVIDER_URL_INFURA_MATIC}}',
      mumbai: '{{PROVIDER_URL_INFURA_MUMBAI}}',
    },
    alchemy: {
      mainnet: '{{PROVIDER_URL_ALCHEMY_MAINNET}}',
      goerli: '{{PROVIDER_URL_ALCHEMY_GOERLI}}',
      matic: '{{PROVIDER_URL_ALCHEMY_MATIC}}',
      mumbai: '{{PROVIDER_URL_ALCHEMY_MUMBAI}}',
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
  },
};
