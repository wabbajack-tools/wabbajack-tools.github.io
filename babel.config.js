const presets = [
  [
    '@babel/env',
    {
      useBuiltIns: 'usage',
      corejs: { version: 3, proposals: true }
    }
  ]
];

const plugins = [['@babel/plugin-transform-react-jsx']];

module.exports = { presets, plugins };
