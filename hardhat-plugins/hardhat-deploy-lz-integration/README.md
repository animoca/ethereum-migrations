# hardhat-deploy-lz-integration HardHat plugin

Integrate LayerZero artifacts and deployments as `external` configuration references.
The plugin assumes the HardHat `networks` configurations have been enriched with `eid` fields.
This plugin only needs `@layerzerolabs/lz-definitions` to be executed, but it needs:

- `@layerzerolabs/lz-evm-sdk-v2` and `@layerzerolabs/test-devtools-evm-hardhat` to succesfully load the artifacts,
- `@layerzerolabs/lz-evm-sdk-v2` to succesfully load the deployments file.

Example:

```js
const {EndpointId} = require('@layerzerolabs/lz-definitions');

networks: {
    mainnet: {
        url: 'http://mainnet',
        eid: EndpointId.ETHEREUM_V2_MAINNET,
    }
},
```
