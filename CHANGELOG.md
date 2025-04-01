# Changelog

## 4.1.0

### New features

- Added a parameter to specify the child token deployment name in `FxERC20RootTunnel_mapToken` migration template.

## 4.0.1

### Bugfixes

- Added package `resolutions` for `@ethersproject/**@5`, `elliptic`, `axios` and `cookie` to fix security issues in transitive dependencies.

## 4.0.0

### Breaking changes

- Updated to dependency version `@animoca/ethereum-contracts@4x` and `@animoca/ethereum-contracts-bridging@2x`.
- Moved `diamond.js` from `templates/` to `helpers/` folder.
- Removed decommissioned network `okextest`.
- Removed POS Portal artifacts, migrations and `namedAccounts` configuration.

### New features

- Added support for LayerZero OFT bridging: `hardhat-deploy-lz-integration` plugin, migration templates and network configurations.
- `@animoca/ethereum-contracts@4.1` and `@animoca/ethereum-contracts-bridging@2.0` deployed on all networks.
- Added proxied ERC721/ERC1155 preset migration templates.

### Bugfixes

- Prevented deploy options overwriting in some token migration templates.
- Fixed bug in diamond helper.
- Fixed Chainlink VRF deployment addresses on sepolia.

### Improvements

- Added etherscan URLs in network configurations where needed.
- Used network name instead of chain id for `namedAccounts` configuration.
- Updated to latest dependencies.

## 3.0.8

### Bugfixes

- Removed configuration for deprecated network okextest.
- Skipped fx-portal migrations on sepolia.

## 3.0.7

### Bugfixes

- Remove wrongly-added fx-portal contracts on amoy.
- Skipped fx-portal migrations on amoy.

## 3.0.6

### Bugfixes

- Missing fx-portal contracts deployed on amoy.

## 3.0.5

### New features

- Support for Base and Base Sepolia networks.

## 3.0.4

### New features

- Added networks and providers configs for Arbitrum Sepolia network.
- Added arbitrum networks as companion networks of bsc networks.

### Breaking changes

- Updated to use latest testnets(amoy, arbsepolia) instead of deprecated testnets(mumbai, arbgoerli) as companion networks.
- Removed deprecated network configs for goerli, mumbai, arbgoerli.

### Improvements

- Updated to dependency version `@animoca/ethereum-contract-helpers@1.0.3`.

## 3.0.3

### New features

- Support for Amoy network.

## 3.0.2

### Improvements

- Updated eslint config.
- Removed unused dependency.

## 3.0.1

### Bugfixes

- Fixed ethers6 bugs on multicall helper.
- Fixed bugs on migration helpers.

## 3.0.0

### Breaking changes

- Updated to dependency version `@animoca/ethereum-contracts@3.0.0`.
- Updated to using `^ethers@6`.

### New features

- Added ERC721_deploy and ERC1155_deploy migration templates.
- Added ERC1155_sealedSafeMint migration template.
- Added ContractOwnership_transferOwnership migration template.
- Added metadata resolvers migrations and templates.
- Added Chainlink VRF deployment files.
- Added `getContractAddressOrFallback` helper.

## 2.0.0

### Breaking changes

- Removed `deploy.js` and `airdrop.js` ERC20 migration templates.
- Renamed ERC20 migration template `sealedAirdrop.js` to `ERC20MintBurn_sealedAirdrop.js`.
- Renamed ERC20 migration template `setTokenURI.js` to `ERC20_setTokenURI.js`.

### New features

- Migrations for `ERC20Facet@2.0`, `ERC20FixedSupplyProxied@2.0` and `ERC20MintBurnProxied@2.0`.
- New migration templates `ERC20FixedSupply_deploy.js` and `ERC20MintBurn_deploy.js`.

### New deployments

- Contracts deployed on Arbitrum.
- `ERC20Facet@2.0`, `ERC20FixedSupplyProxied@2.0` and `ERC20MintBurnProxied@2.0` on all supported networks.

## 1.0.10

### New features

- Support for Sepolia and Arbitrum networks.

### New deployments

- Contracts deployed on Sepolia and Arbitrum Goerli.

## 1.0.9

### New deployments

- Contracts deployed on BSC.

## 1.0.8

### New deployments

- Contracts deployed on BSC testnet.

## 1.0.7

### Bugfixes

- Fix dependabot security alerts.
- Update to latest dependencies.

## 1.0.6

### New features

- Added ERC20 sealed airdrop migration template.

## 1.0.5

### Improvements

- Maintain ABI structure in diamonds ABI generation.

## 1.0.4

### New features

- Added `AccessControl.revokeRole` migration template.

## 1.0.3

### New features

- Added migration templates for diamonds.

## 1.0.2

### Bugfixes

- Remove the contract name from the tags list in `access/grantRole`.
- FxRoot and FxChild accounts default to the deployer account.

## 1.0.1

### Bugfixes

- Fix versions in templates.
- Fix security vulnerability in dependency.

## 1.0.0

### Breaking changes

- Update to latest contract dependencies.
- Fix versioning rules.

## 0.1.0

### Breaking changes

- Updated to dependency version `@animoca/ethereum-contracts@0.3.0`.
- Reorganized helpers.
- Removed hardhat plugin `hardhat-deploy-etherenv-exports`.
- Renamed networks.

### New features

- Used deterministic deployments in migrations.
- Added support for `ERC20` Polygon POS Portal predicates.
- Added support for `ERC20` Polygon Fx Portal tunnels.
- Added migration for Polygon Fx Portal contracts.
- Added migration for `ForwarderRegistryContextFacet`.
- Added migration and helpers for `MultiStaticCall`.
- Added migrations for `ERC721`-related facets.
- Added migrations for `ERC1155`-related facets.
- Optionally use environment variable `MNEMONIC_PATH` or `MNEMO_PATH` to select a directory where to find the mnemonic file(s).
- Added hardhat plugin `etherscan-api-keys`.

### Bugfixes

- Fixed bug in `skipIfFileExists`.

## 0.0.1

- Initial release.
