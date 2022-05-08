const HtmlWebPackPlugin = require("html-webpack-plugin");
const htmlPlugin = new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
});
const path = require('path');
const webpack = require("webpack");

module.exports = {
    mode: "development",
    entry: {
        index: ['./src/index.js', 'webpack-hot-middleware/client']
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        },
        {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
        }
        ]
    },
    devtool: 'inline-source-map',
    plugins: [htmlPlugin, new webpack.HotModuleReplacementPlugin()],
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        publicPath: '/'
    }
};