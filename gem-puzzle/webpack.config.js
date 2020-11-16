let environment = process.env.NODE_ENV || 'development'; // Windows: $env:NODE_ENV="production"
let isProduction = environment === 'production';

let path = require('path');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
let WebpackBuildNotifierPlugin = require('webpack-build-notifier');

let webpack = require('webpack');

const config = {
    mode: environment,
    context: __dirname,
    entry: './assets/js/index.js',
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "img/[name].[ext]",
                    },
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "fonts/[name].[ext]",
                    },
                }
            },
        ],
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname),
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'main.css'
        })
    ]
};

if(isProduction) {
    config.plugins.push(new OptimizeCSSAssetsPlugin());
} else {
    config.devtool = "source-map";
    config.plugins.push(new WebpackBuildNotifierPlugin({
        title: "Gem-puzzle Webpack Build",
        logo: path.resolve("./img/favicon.png")
    }));
}

console.log('Running: ' + environment + ' mode.');

module.exports = config;