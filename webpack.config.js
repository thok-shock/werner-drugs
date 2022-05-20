require('dotenv').config()
const HtmlWebPackPlugin = require("html-webpack-plugin");
const htmlPlugin = new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
});
const path = require('path');
const webpack = require("webpack");


if (process.env.NODE_ENV === 'development') {
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
        plugins: [new webpack.HotModuleReplacementPlugin()],
        output: {
            filename: "[name].bundle.js",
            path: path.resolve(__dirname, 'dist'),
            clean: true,
            publicPath: '/'
        }
    };
} else if (process.env.NODE_ENV === 'production') {
    module.exports = {
        mode: "production",
        entry: {
            index: ['./src/index.js']
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
        plugins: [htmlPlugin],
        output: {
            filename: "[name].bundle.js",
            path: path.resolve(__dirname, 'dist'),
            clean: true,
            publicPath: '/'
        }
    };
}

