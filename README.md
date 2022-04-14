# Animoca Ethereum Contracts

[![NPM Package](https://img.shields.io/npm/v/@animoca/ethereum-migrations.svg)](https://www.npmjs.org/package/@animoca/ethereum-migrations)

Ethereum migrations library which uses [hardhat-deploy](https://github.com/wighawag/hardhat-deploy) consisting of core migrations, Hardhat plugins and configurations, migration templates and helpers.

## Overview

### Core migrations

This repository contains the migration scripts which deploy the contracts availbale in [@animoca/ethereum-contracts](https://github.com/animoca/ethereum-contracts).

the deployment artifacts for the contracts already deployed on live networks are avilable in the `deployments` folder.

### HardHat plugins and configurations

A set of plugins and configurations are provided to improve the development experience. They can be used in your own project in your `hardhat.config.js`:

```javascript
const merge = require('lodash.merge');

// load all the plugins (you can also load them one by one)
require('@animoca/ethereum-migrations/hardhat-plugins');

// deep merges your config on top of the default provided config
module.exports = merge(require('./hardhat-config'), {
  // my config
});
```

### Migration templates and helpers

For common migrations scenarios, some templates are available in `src/templates`. One template function contains the whole logic of a given migration. For example, in its most basic form, a contract deployment can be written as follow:

```javascript
const {deployment} = require('@animoca/ethereum-migrations/src/templates/contracts');

module.exports = deployment('MyContract', 'MyContract', []);
```

Some migration helper functions, such a useful skip functions are available in `src/helpers`.

## Installation

To install the module in your project, add it as an npm dependency:

```bash
yarn add -D @animoca/ethereum-migrations hardhat hardhat-deploy
```

or

```bash
npm add --save-dev @animoca/ethereum-migrations hardhat hardhat-deploy
```

## Development

Install the dependencies:

```bash
yarn
```

Run the migrations on the hardhat EVM:

```bash
yarn deploy
```

Run the full pipeline:

```bash
yarn run-all
```

See `package.json` for additional commands.
