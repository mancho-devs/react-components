const BabelJest = require('babel-jest');

const babelOptions = {
  presets: [
    'babel-preset-gatsby',
    '@babel/preset-typescript',
    '@babel/preset-env',
    '@babel/preset-react'
  ]
};

module.exports = BabelJest.default.createTransformer(babelOptions);
