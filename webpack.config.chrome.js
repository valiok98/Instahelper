const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
    mode: 'development',
    entry: {
        'navigate-profile': './chrome_extension/js/content/navigate-profile.js'
    },
    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, 'chrome_extension', 'dist')
    },
    optimization: {
        minimizer: [new UglifyJsPlugin()]
    },
    module: {
        rules: [
            // {
            //     test: /\.(s)?css$/,
            //     exclude: /\.(woof|woff2|eot|ttf)/,
            //     use: [
            //         {
            //             loader: 'file-loader',
            //             options: {
            //                 name: 'index.min.css',
            //             },
            //         },
            //         { loader: 'extract-loader' },
            //         { loader: 'css-loader' },
            //         { loader: 'resolve-url-loader' },
            //         {
            //             loader: 'postcss-loader',
            //             options: {
            //                 plugins: () => [autoprefixer()],
            //             },
            //         },
            //         {
            //             loader: 'sass-loader',
            //             options: {
            //                 includePaths: ['./node_modules'],
            //             },
            //         }
            //     ],
            // },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new LiveReloadPlugin()
    ]
};