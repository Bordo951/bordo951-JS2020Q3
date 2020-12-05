const path = require('path'),
    webpack = require('webpack'),
    HTMLWebpackPlugin = require('html-webpack-plugin'),
    {CleanWebpackPlugin} = require('clean-webpack-plugin'),
    CopyWebpackPlugin = require("copy-webpack-plugin"),
    MiniCssExtractPlugin = require("mini-css-extract-plugin"),
    OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin'),
    TesterWebpackPlugin = require('terser-webpack-plugin'),
    optimization = () => {
        const config = {
            splitChunks: {
                chunks: 'all'
            }
        }
        if (isProd) {
            config.minimizer = [
                new OptimizeCssAssetWebpackPlugin(),
                new TesterWebpackPlugin()
            ]
        }
        return config
    }

isDev = process.env.NODE_ENV === 'development',
    isProd = !isDev


module.exports = {
    context: path.resolve(__dirname, "src"),
    mode: 'development',
    entry: ['./scripts/index.js'],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: ''
    },
    resolve: {
        extensions: ['.js', '.json', '.png', '.jpeg', '.jpg']
    },
    optimization: optimization(),
    devServer: {
        port: 4200,
        hot: isDev
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
                patterns: [{
                    from: path.resolve(__dirname, 'src/assets'),
                    to: path.resolve(__dirname, 'dist/assets')
                }]
            }
        ),
        new MiniCssExtractPlugin({
            filename: 'main.css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {}
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    }
}

if (isDev) {
    module.exports.plugins.push(new webpack.HotModuleReplacementPlugin());
}
