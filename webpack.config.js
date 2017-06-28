//get paths to the src folder and node_modules folder
const path = require('path');
const SRC = path.join(__dirname, 'src/');
const NODE_MODULES = path.join(__dirname, 'node_modules/');

//plugins
let webpack = require("webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
let OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: ["./src/index.js", "./src/styles/main.scss"],
    output: {
        path: __dirname + "/dist",
        filename: "app.js"
    },
    resolve: {
      //these are the locations in which Webpack will look for modules
      modules: [SRC, NODE_MODULES, path.join(SRC, 'components')]
    },
    module: {
        //the rules array contains rules and configuration for various installed loaders
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('css-loader')
            },
            {
                test: /\.(sass|scss)$/,
                loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
            }
        ]
    },
    plugins: [
        //uglify JS and CSS
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false,
            },
            sourceMap: true
        }),
        //output CSS file
        new ExtractTextPlugin("app.min.css"),
        //minify CSS
        new OptimizeCssAssetsPlugin(),
        //process html files and save to dist/
        new HtmlWebpackPlugin({
            // hash: true,
            filename: 'index.html',
            template: __dirname + '/src/index.html',
            showErrors: false
        })
  ],
  //dev server configuration
  devServer: {
      contentBase: __dirname + '/dist',
      compress: true,
      port: 9000
  }

}
