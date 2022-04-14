const merge = require('lodash.merge');
require('dotenv').config();

require('./hardhat-plugins');

module.exports = merge(require('./hardhat-config'), require('./hardhat-local-config'));
