module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: [
    'plugin:react/recommended',
    'standard',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'prettier', 'jest'],
  rules: {
    'prettier/prettier': 'error',
    'jest/consistent-test-it': ['error', { fn: 'test' }], // test()を使うことを強制
    'jest/require-top-level-describe': ['error'], // トップレベルでdescribe()を使うことを強制
  },
};
