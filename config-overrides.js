const { 
  override, 
  useBabelRc, 
  addLessLoader, 
  fixBabelImports,
} = require('customize-cra');

module.exports = override(
  addLessLoader({
    strictMath: true,
    noIeCompat: true
  }),
  fixBabelImports('import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }),
  useBabelRc(),
);
