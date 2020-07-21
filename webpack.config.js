const path = require("path")
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: "development",
    entry: {
        "src/js/index": path.join(__dirname, "/src/js/index.js"),
    },
    optimization: {
        minimizer: [new TerserPlugin()],
    },
    output: {
        path: path.join(__dirname, "/public/build/js/"),
        publicPath: '/',
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /.js|jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        "presets": [
                            "@babel/env",
                            "@babel/react"
                        ]
                    }
                },
            }
        ]
    },
}