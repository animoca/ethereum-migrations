const {mergeConfigs} = require('@animoca/ethereum-contract-helpers/src/config');
require('dotenv').config();

require('./hardhat-plugins');

module.exports = mergeConfigs(require('./hardhat-config'), require('./hardhat-local-config'));
