const globals = require('globals');

const {defineConfig, globalIgnores} = require('eslint/config');

module.exports = defineConfig([
  require('eslint-plugin-prettier/recommended'),
  globalIgnores(['node_modules/*', '.yalc/*']),
  {
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.node,
        ...globals.es2020,
      },
    },
    rules: {
      'no-unused-vars': ['error', {argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_'}],
      'no-multi-spaces': ['error', {exceptions: {VariableDeclarator: true}}],
      'no-else-return': ['error', {allowElseIf: true}],
      'max-params': ['error', 7],
      'no-await-in-loop': 'off',
      'max-len': ['error', {code: 150}],
    },
    ignores: ['artifacts*/**', 'cache*/**', 'imports/*', 'deployments*/**', 'generated/*'],
  },
]);
