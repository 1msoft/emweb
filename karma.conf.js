const path = require('path');

const webpackConf = {
  mode: "none",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'istanbul-instrumenter-loader',
            options: { esModules: true }
          }, {
            loader: "babel-loader",
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
        ],
      },
      {
        // for font
        test: /\.(ttf|otf|eot|woff(?:2)?)(\?[a-z0-9]+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10 * 1000,
            },
          },
        ],
      },
      {
        // for svg
        test: /\.(svg?)(\?[a-z0-9]+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10 * 1000,
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|ogg|mp3)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10 * 1000,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".js", ".json"],
  },
};

module.exports = function(config) {
  config.set({

    files: [
      './node_modules/@babel/polyfill/dist/polyfill.min.js',
      `src/components/**/*.test.js`,
      `test/**/*.test.js`,
    ],

    frameworks: ['mocha'],

    preprocessors: {
      'test/**/*.test.js': ['webpack'],
      'src/components/**/*.test.js': ['webpack'],
    },

    reporters: ['mocha', 'coverage-istanbul'],

    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly', 'text-summary'],
      dir: path.join(__dirname, 'coverage'),
      combineBrowserReports: true,
      fixWebpackSourcePaths: true,
      skipFilesWithNoCoverage: true,
      'report-config': {
        html: {
          subdir: 'html'
        }
      }
    },
    webpack: webpackConf,

    webpackMiddleware: {
      noInfo: true
    },

    plugins: [
      require("karma-webpack"),
      require("karma-mocha"),
      require("karma-chai"),
      require("karma-chrome-launcher"),
      require("karma-mocha-reporter"),
      require("karma-coverage-istanbul-reporter"),
      require("istanbul-instrumenter-loader"),
      require('karma-jasmine'),
    ],
    browsers: ['ChromeHeadless'],
    customLaunchers: {
      // 打开浏览器超时请设置 CHROME_BIN 环境变量为当前本地谷歌启动程序
      ChromeHeadless: {
        base: 'Chrome',
        flags: [
          '--disable-translate',
          '--headless',
          '--disable-gpu',
          '--disable-extensions',
          '--remote-debugging-port=9222',
        ],
      }
    },
    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
      exitOnResourceError: true
    },
  });
};
