# LayerZero V2 OFT Tokens deployment flow

Remark: make sure the network config for the secondary networks have a companionNetwork defined that links to the primary chain.

## ERC20FixedSupply preset

### Primary chain

- ERC20FixedSupply_deploy
- OFTAdapterFixedSupply_deploy, using the token deployment name from the previous step

### Secondary chains (for each)

- ERC20FixedSupply_OFT_secondaryChain_deploy, using a different token deployment name than the primary chain one
- OFTAdapterFixedSupply_deploy, using the token deployment name from the previous step

## ERC20MintBurn preset

### Primary chain

- ERC20MintBurn_deploy
- OFTAdapterMintBurn_deploy, using the token deployment name from the previous step
- AccessControl.grantRole(tokenDeploymentName, 'minter', getContractAddress(`${OFTAdapterMintBurn_${tokenDeploymentName}}`))

### Secondary chains (for each)

- ERC20MintBurn_deploy, using a different token deployment name than the primary chain one
- OFTAdapterMintBurn_deploy, using the token deployment name from the previous step
- AccessControl.grantRole(tokenDeploymentName, 'minter', getContractAddress(`${OFTAdapterMintBurn_${tokenDeploymentName}}`))
