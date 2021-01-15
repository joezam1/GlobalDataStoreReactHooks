const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


const jsEntryPath = path.join(__dirname, './index.js');
const allFilesOutputPath = path.join(__dirname, 'dist/');


const indexHtmlPath = path.resolve(__dirname, './index.html');
const htmlPlugin = new htmlWebpackPlugin({template:indexHtmlPath })
const cleanDistPlugin = new CleanWebpackPlugin();

module.exports = {
    devtool:'source-map',
    mode:'development',
    entry:[jsEntryPath],
    output:{
        path:allFilesOutputPath,
        filename:'bundle.js',
        publicPath:'/'
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                loader:"babel-loader",
                options:{
                    presets:['@babel/preset-env','@babel/preset-react']
                }
            },
            {
                test:/\.(s*)css$/,
                use:['style-loader','css-loader','sass-loader']
            }
        ]
    },
    devServer:{
        historyApiFallback:true,
        port:3080
    },
    plugins:[htmlPlugin,cleanDistPlugin],
    resolve:{
        extensions:['.js','.jsx','.scss']
    }

}