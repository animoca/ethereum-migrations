# hardhat-deploy-mnemonics HardHat plugin

Loads `.mnemonic_${MNEMO}` files as signing accounts for migrations by using the `MNEMONIC` or `MNEMO` environment variable. For example `MNEMO=testnet hardhat deploy` will load the mnemonic file `.mnemonic_testnet` and use it to sign transactions.

By default, mnemonics are loaded in the project's root directory. To select another folder, use `MNEMONIC_PATH` or `MNEMO_PATH`.