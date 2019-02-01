const path = require('path');
const HWP = require('html-webpack-plugin');
module.exports = {
    entry: path.join(__dirname, '/src/index.jsx'),
    output: {
        filename: 'build.js',
        path: path.join(__dirname, '/dist')
    },
    devServer: {
        inline: true,
        port: 8081,
        open: true,
        historyApiFallback: true,
        disableHostCheck: true,
    },
    module: {
        rules: [{
            test: /(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
        {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        },
        {
            test: /\.less$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'less-loader'
            }]
        }]
    },
    plugins: [
        new HWP(
            { template: path.join(__dirname, '/src/index.html') }
        )
    ]
}