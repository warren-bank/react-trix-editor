const path    = require('path')
const nod_mod = path.resolve('./node_modules') + path.sep
const webpack = require(nod_mod + 'webpack')

module.exports = {
   entry: './1-trix-global/src/index.js',
    output: {
        path: path.resolve(__dirname, '1-trix-global', 'dist', 'js'),
        filename: 'bundle.js',
        sourceMapFilename: 'bundle.map'
    },
    devtool: '#source-map',
    resolve: {
        modules: [
            path.resolve('./1-trix-global/src'),
            nod_mod.substring(0, nod_mod.length-1)
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: nod_mod + 'babel-loader',
                query: {
                    presets: [nod_mod + 'babel-preset-' + 'env', nod_mod + 'babel-preset-' + 'stage-0', nod_mod + 'babel-preset-' + 'react']
                }
            },
            {
                test: /\.css$/,
                use: [
                    nod_mod + 'style-loader',
                    nod_mod + 'css-loader',
                    {
                        loader: nod_mod + 'postcss-loader',
                        options: {
                            plugins: () => [require(nod_mod + 'autoprefixer')]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            warnings: false,
            mangle: true,
            cache: false
        })
    ]
}
