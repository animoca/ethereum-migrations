# hardhat-deploy-lz-deployments HardHat plugin

Integrate LayerZero deployments as `external.deployments` references.
The plugin assumes the HardHat `networks` configurations have been enriched with `eid` fields.
This plugin only needs `@layerzerolabs/lz-definitions` to be executed, but in order to actually load the deployments files, the `@layerzerolabs/lz-evm-sdk-v2` dependency is required.

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
