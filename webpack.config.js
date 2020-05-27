const path = require("path")
const fs = require("fs");
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

function generateHtmlPlugins(templateDir) {
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
    return templateFiles.map(item => {
        const parts = item.split(".");
        const name = parts[0];
        const extension = parts[1];
        return new HtmlWebpackPlugin({
            filename: `${name}.html`,
            template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
            inject: false
        });
    });
}
const htmlPlugins = generateHtmlPlugins("./src/html/views");

module.exports = {
    entry: {
        script: './src/js/app.js',
        landing: './src/js/landing.js'
    },
    output: {
        filename: "./js/[name].js",
        publicPath: '../',
    },
    devtool: "source-map",
    mode: "development",
    optimization: {
        minimizer: [
            new TerserPlugin({
                sourceMap: true,
                extractComments: true
            })
        ]
    },
    module: {
      rules: [
          {
              test: /\.(png|jpg|gif|jpeg)$/,
              use: [
                  {
                      loader: 'file-loader',
                      options: {
                          name: '[name].[ext]',
                          outputPath: './img',
                          esModule: false
                      }
                  }
              ]
          },
          {
              test: /\.(scss)$/,
              use: [{
                  loader: 'file-loader',
                  options: {
                      name: '[name].css',
                      outputPath: './css'
                  },
              },{ loader: 'extract-loader'},{
                  loader: 'css-loader', // translates CSS into CommonJS modules
                  options: {
                      // sourceMap: true
                  }
              },{
                  loader: "resolve-url-loader",
                  options: {
                  }
              }, {
                  loader: 'postcss-loader', // Run post css actions
                  options: {
                      plugins: function () { // post css plugins, can be exported to postcss.config.js
                          return [
                              require('autoprefixer')
                          ];
                      }
                  }
              }, {
                  loader: 'sass-loader', // compiles Sass to CSS
                  options: {
                      sourceMap: true,
                      // Prefer Dart Sass
                      implementation: require('sass'),
                      webpackImporter: false,
                      sassOptions: {
                          includePaths: ['./node_modules'],
                      },
                  }
              }]
          },
          {
              test: /\.html$/,
              include: path.resolve(__dirname, "src/html/includes"),
              use: ["raw-loader"]
          },
          {
              test: /\.js$/,
              loader: 'babel-loader',
              query: {
                  presets: ['@babel/preset-env'],
              },
          }
      ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        //new CopyPlugin([
            //{ from: 'src/form.php', to: 'form.php' },
        //]),
    ].concat(htmlPlugins),
    devServer: {
        publicPath: '/',
    }
}
