var path = require('path');

module.exports = {
    entry: "./index.js",
    //entry: "./test.js",
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'],
                    cacheDirectory: true
                }
            }
        ]
    },
    stats: {
        colors: true
    }
};


