# node-providers HardHat plugin

Manage node provider URLs.

Allows to use different node providers for networks, configured by environment variables. Providers are defined in `config.providers`. Networks can define a `defaultProvider` which references an existing provider/network configuration. The environment variable NODE_PROVIDER can be used to override the `defaultProvider` or to apply a provider url to a network without a `defaultProvider`.

Some provider urls make use of a private key: it should be set by environment variable and used in the provider configuration with the notation `{{MY_KEY}}`.

`hardhat.config` example:

```javascript
module.exports = {
  // ...
  networks: {
    goerli: {
      url: 'goerli',
      defaultProvider: "infura",
    },
    mainnet: {
      url: 'mainnet',
      // no defaultProvider: the environment variable NODE_PROVIDER must be set in order to determine which provider to use for this network
    },
  },
  providers: {
    infura: {
      goerli: 'https://goerli.infura.io/v3/{{INFURA_GOERLI_KEY}}',
    },
    alchemy: {
      mainnet: 'https://eth.alchemyapi.io/v2/{{ALCHEMY_MAINNET_KEY}}',
    },
  },
};
```

Run examples:

```bash
INFURA_GOERLI_KEY=XXX hardhat deploy --network goerli # runs with the default 'infura.goerli' provider url
# hardhat deploy --network mainnet # triggers an error since the provider is not defined for the network mainnet
ALCHEMY_GOERLI_KEY=XXX NODE_PROVIDER=alchemy hardhat deploy --network goerli # runs with 'alchemy.goerli' provider url (overriding the default provider)
ALCHEMY_MAINNET_KEY=XXX NODE_PROVIDER=alchemy hardhat deploy --network mainnet # runs with 'alchemy.mainnet' provider url
```
