const presets = [
  [
    '@babel/env',
    {
      useBuiltIns: 'usage',
      corejs: { version: 3, proposals: true }
    }
  ]
];

const plugins = [
  ['@babel/plugin-transform-react-jsx'],
  [
    'babel-plugin-import',
    {
      libraryName: '@material-ui/core',
      libraryDirectory: 'esm',
      camel2DashComponentName: false
    }
  ]
];

module.exports = { presets, plugins };
