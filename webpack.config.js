const path = require("path")
const TerserPlugin = require('terser-webpack-plugin');
// const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: "development",
    target: 'node', // in order to ignore built-in modules like path, fs, etc. 
    // externals: [nodeExternals()], // in order to ignore all modules in no
    entry: {
        index: path.join(__dirname, "/resources/js/index.js"),
    },
    optimization: {
        minimizer: [new TerserPlugin()],
    },
    output: {
        path: path.join(__dirname, "/public/js/"),
        filename: "[name].bundle.js"
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
            },
        ]
    },
}