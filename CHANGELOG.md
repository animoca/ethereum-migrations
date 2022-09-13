# Changelog

## 0.1.0

### Breaking changes

- Updated to dependency version `@animoca/ethereum-contracts@0.1.0`.
- Reorganized helpers.
- Removed hardhat plugin `hardhat-deploy-etherenv-exports`.
- Renamed networks.

### New features

- Used deterministic deployments in migrations.
- Added support for `ERC20` polygon predicates.
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
