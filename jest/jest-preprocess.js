const babelOptions = {
  presets: [
    'babel-preset-gatsby',
    '@babel/preset-typescript',
    '@babel/preset-env',
    '@babel/preset-react'
  ]
};

module.exports = require('babel-jest').createTransformer(babelOptions);