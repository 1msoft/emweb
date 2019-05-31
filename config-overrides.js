const {
  override,
  useBabelRc,
  useEslintRc,
  addLessLoader,
  addWebpackAlias,
  addPostcssPlugins,
} = require('customize-cra');

const modifyVars = require('./src/config/modifyVars');
const path = require('path');
const autoprefixer = require('autoprefixer');
const px2rem = require('postcss-px2rem');

// 路径别名配置
const alias = {
  ["@pages"]: path.resolve(__dirname, "src/pages"),
  ["@config"]: path.resolve(__dirname, "src/config"),
  ["@assets"]: path.resolve(__dirname, "src/assets"),
  ["@components"]: path.resolve(__dirname, "src/components"),
};

// postcss插件配置
const postcssPlugins = [
  autoprefixer({
    browsers: ['last 2 versions', 'not ie <= 8', 'iOS 7'],
    remove: true,
  }),
  // px2rem({remUnit: 16}),
  px2rem({ remUnit: 16 }),
];

module.exports = override(
  addLessLoader({
    modifyVars,
    javascriptEnabled: true
  }),
  useBabelRc(),
  useEslintRc(),
  addWebpackAlias(alias),
  addPostcssPlugins(postcssPlugins),
);
