const path = require('path');

module.exports = {
    entry: './app/src/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'widget.js',
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            }
        ]
    }
};