# Changelog

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
