const path = require('path');

module.exports = {
  extends: 'vinta/recommended',
  rules: {
    'jest/prefer-inline-snapshots': ['off'],
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
  },
  env: {
    es6: true,
    browser: true,
    jest: true
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: path.join(__dirname, '/webpack.local.config.js'),
        'config-index': 1
      }
    }
  }
}
