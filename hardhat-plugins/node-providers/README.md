# node-providers HardHat plugin

Manage node provider URLs.

Allows to use different node providers for networks, configured by environment variables. Providers are defined in `config.providers`. Networks can define a `defaultProvider` which references an existing provider/network configuration. The environment variable NODE_PROVIDER can be used to override the `defaultProvider` or to apply a provider url to a network without a `defaultProvider`.

Some provider urls make use of a private key: it should be set by environment variable and used in the provider configuration with the notation `{{MY_KEY}}`.

`hardhat.config` example:

```javascript
module.exports = {
  // ...
  networks: {
    rinkeby: {
      url: 'rinkeby',
      defaultProvider: "infura",
    },
    kovan: {
      url: 'kovan',
      // no defaultProvider: the environment variable NODE_PROVIDER must be set in order to determine which provider to use for this network
    },
    mainnet: {
      url: 'mainnet',
      defaultProvider: "alchemy",
    },
  },
  providers: {
    infura: {
      rinkeby: 'https://rinkeby.infura.io/v3/{{INFURA_RINKEBY_KEY}}',
    },
    alchemy: {
      rinkeby: 'https://eth-rinkeby.alchemyapi.io/v2/{{ALCHEMY_RINKEBY_KEY}}',
      kovan: 'https://eth-kovan.alchemyapi.io/v2/{{ALCHEMY_KOVAN_KEY}}',
    },
  },
};
```

Run examples:

```bash
INFURA_RINKEBY_KEY=XXX hardhat deploy --network rinkeby # runs with the default 'infura.rinkeby' provider url
ALCHEMY_RINKEBY_KEY=XXX PROVIDER=alchemy hardhat deploy --network rinkeby # runs with 'alchemy.rinkeby' provider url (overriding the default provider)
ALCHEMY_KOVAN_KEY=XXX PROVIDER=alchemy hardhat deploy --network kovan # runs with 'alchemy.kovan' provider url
# hardhat deploy --network kovan # triggers an error since the provider is not defined for the network kovan
```
