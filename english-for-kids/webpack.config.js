const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

//Object for Webpack configuration
module.exports = {
    context: path.resolve(__dirname, 'src'), //where save source code of project
    mode: 'development', //collect in design mode: if you need bundle.js to be minified (in one line), commit this parameter
    entry: {
        main: './scripts/index.js'
    }, //where to start, there may be more than one
    output: {
        filename: '[name].[contenthash].js', //save all js-files from entry
        path: path.resolve(__dirname, 'dist') //folder dist
    },
    resolve: {
        extensions: ['.js', '.json', '.png']
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html' //responsible for automatically connecting js in html
        }),
        new CleanWebpackPlugin()
    ],
    //conversion css into js
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            }
        ]
    }
}