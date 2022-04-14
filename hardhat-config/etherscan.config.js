module.exports = {
  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY_MAINNET,
      ropsten: process.env.ETHERSCAN_API_KEY_ROPSTEN,
      rinkeby: process.env.ETHERSCAN_API_KEY_RINKEBY,
      goerli: process.env.ETHERSCAN_API_KEY_GOERLI,
      kovan: process.env.ETHERSCAN_API_KEY_KOVAN,
      polygon: process.env.ETHERSCAN_API_KEY_POLYGON,
      polygonMumbai: process.env.ETHERSCAN_API_KEY_POLYGONMUMBAI,
    },
  },
};
