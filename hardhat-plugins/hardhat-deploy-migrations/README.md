# hardhat-deploy-migrations HardHat plugin

Provides a ready-to-use environment for running migrations:

- Safe-guard runtime executions of `hardhat deploy` on live networks via user confirmations.
- Adds the `generated` hardhat configuration `config.paths.generated` is a folder where files generated during migrations can be saved and retrieved. The default value for the path is `generated`;

Requires to have `hardhat-deploy` plugin loaded already.
