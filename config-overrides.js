const {
  override,
  useBabelRc,
  useEslintRc,
  addLessLoader,
  addWebpackAlias,
  addPostcssPlugins,
  addWebpackPlugin,
} = require('customize-cra');

const modifyVars = require('./src/config/modifyVars');
const path = require('path');
const autoprefixer = require('autoprefixer');
const px2rem = require('postcss-px2rem');
const KantuiThemeWebpackPlugin = require('@1msoft/kantui-theme-webpack-plugin');


// 路径别名配置
const alias = {
  ["@pages"]: path.resolve(__dirname, "src/pages"),
  ["@config"]: path.resolve(__dirname, "src/config"),
  ["@assets"]: path.resolve(__dirname, "src/assets"),
  ["@stores"]: path.resolve(__dirname, "src/stores"),
  ["@components"]: path.resolve(__dirname, "src/components"),
  ["@utils"]: path.resolve(__dirname, "src/utils"),
};

// postcss插件配置
const postcssPlugins = [
  autoprefixer({
    browsers: ['last 2 versions', 'not ie <= 8', 'iOS 7'],
    remove: true,
  }),
  px2rem({ remUnit: 16 }),
];

const themeOption = { 
  theme: require("./src/config/theme"),
  antdDir: "./node_modules/antd/lib",
  kantDir: "./node_modules/@1msoft/kant-ui/lib",
  customLessDir: "./src",
  colorOnly: true,
};

const themePlugin = new KantuiThemeWebpackPlugin(themeOption);

module.exports = override(
  addLessLoader({
    modifyVars,
    javascriptEnabled: true
  }),
  useBabelRc(),
  useEslintRc(),
  addWebpackAlias(alias),
  addPostcssPlugins(postcssPlugins),
  addWebpackPlugin(themePlugin),
);
