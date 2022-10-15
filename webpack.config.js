"use strict"; //говорит о том что используется современный js

const buildEnv = {
    development: 'development',
    production: 'production',
    developmentOut: 'developmentOut'
}
const NODE_ENV = process.env.NODE_ENV || buildEnv.development; //переменная окружения - для распознования продакшна или девелопмента
let Mode = NODE_ENV;
const NODE_ENV_TYPE = process.env.NODE_ENV_TYPE || ''; //переменная окружения - для распознования продакшна или девелопмента
if(NODE_ENV_TYPE == 'out')
    Mode = buildEnv.developmentOut;
//console.log('NODE_ENV_TYPE',NODE_ENV_TYPE);
const isProduction = Mode == buildEnv.production;
const isDevelopment = Mode == buildEnv.development;
const isDevelopmentOut = Mode == buildEnv.developmentOut;

const webpack = require('webpack');//подключаем вебпак
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const VueLoader = require('vue-loader');

const VueLoaderPlugin = require('vue-loader/lib/plugin')

const path = require('path');
var apiBaseUrl = 'ws://194.28.112.20:8048/pos-api/websocket';//http://localhost:64622
var apiUrl = !isProduction? apiBaseUrl : apiBaseUrl.replace(/\w+\:\/\/[\w\:]+\//i, "/") ;//http://тест.школа-пмр.рф/web-api

var resFolder = path.resolve(__dirname, 'dist'); //'D:\\Projects\\RunPayLoyalty\\kko-pos\\wMPos4XXX\\src\\main\\assets\\www\\js\\iFrames\\motivation'; //куда будет собираться файл

module.exports = {    
    mode: NODE_ENV,
    entry: './src/main',//корневой модуль который будет собираться main.js в корне
    output: {        
        publicPath: isDevelopment? '/': '',
        path: resFolder,//path.resolve(__dirname, 'dist'), //куда будет собираться файл
        filename: 'bundle.js' //название результирующего файла
    },
    devtool: 'eval',//при сборке бандла создается map скрипт который нужен чтобы в отладке каждый модуль выглядел как отдельный файл. Иначе сложно дебажить 
    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(Mode), //объявляется для всех модулей глобальная переменная NODE_ENV(видна только при сборке) в которой будет строка с переменной окружения 'development'. В модулях можно будет писать: if(NODE_ENV=='development').....
            ApiUrl: JSON.stringify(apiUrl) //ссылка на апи
        }),
        new HtmlWebpackPlugin({ //генерация файла index.html для продакшна по шаблону index.html для девелопа.(добавляется ссылка на прод-скрипт с хэшем)
            hash: isProduction,
            filename: path.resolve(resFolder, 'index.html'),//path.resolve(__dirname, 'dist/index.html'), 
            template: path.resolve(__dirname, 'src/index.html')           
        }),
        new VueLoaderPlugin(),//плагин для загрузки vue
        new webpack.ProvidePlugin({
           //$: "jquery",
            //jQuery:"jquery",
            //Modernizr : "Modernizr"
        })
    ],
    //https://webpack.js.org/configuration/dev-server/
    devServer: { //запустить тестовый сервер
        contentBase: path.resolve(__dirname, 'dist'),
        inline: true,
        hot: true,
        // host: isDevelopmentOut?'0.0.0.0':undefined,
        // port: isDevelopmentOut?9095:9093,
        port: 9095,
        historyApiFallback: true, //j       
        compress: true,//включить gzip compression   
        proxy:{ //url rewrite
            '/web-api':{
                target: 'http://localhost:64622/',//cabinets
                changeOrigin: true,
            },
            '/files':{
                target: 'http://194.28.112.20:8048',//cabinets
                changeOrigin: true,
            },
            '/Photo/':{
                target: 'http://localhost:64622/',//public web
                changeOrigin: true,
            }
        }     
    },
    resolve: {
        extensions: ['.ts', '.js', '.json',  '.vue'],
        alias: {
            vue$: 'vue/dist/vue.js',
            "@": path.resolve(__dirname, "./src"),
            "@pages": path.resolve(__dirname, "./src/components/pages"),
            "@layouts": path.resolve(__dirname, "./src/components/layouts"),
            "@partials": path.resolve(__dirname, "./src/components/partials"),
            "@controls": path.resolve(__dirname, "./src/components/controls"),
            "@components": path.resolve(__dirname, "./src/components"),
            //"@assets": path.resolve(__dirname, "./src/assets"),            
            //'jquery': path.resolve(__dirname, "./src/assets/js/jquery.min.js"),      
            //'bootstrap': path.resolve(__dirname, "./src/assets/js/bootstrap.min.js"),
            //'Modernizr':path.resolve(__dirname, "./src/assets/js/modernizr.custom.js"),
          },          
    },
    module: {
        rules: [{// правила парсинга файлов с определенными расширениями
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    ts: 'ts-loader',
                    options: {
                        transpileOnly: true,// для ускорения сборки проекта
                        experimentalWatchApi: true, //для ускорения сборки проекта
                    },
                    less: ['style-loader', 'css-loader','less-loader']
                        // {
                        //     loader: 'less-loader',
                        //     options: {
                        //         modifyVars: require(path.resolve(__dirname, 'global.less.js')) // файл с глобальными переменными                    
                        //     }
                        // }
                    //scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
                    //sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' // <style lang="sass">
                },
            }
        },
        {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            options: {
                transpileOnly: true,  //для ускорения сборки проекта
                experimentalWatchApi: true,  //для ускорения сборки проекта
                appendTsSuffixTo: [/\.vue$/]
            }
        },

        {
            test: /\.less$/,
            loader: 'style-loader!css-loader!less-loader'//!sass-loader!stylus-loader
        },
        {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        },
        {
            test: /\.(eot|svg|ttf|woff|woff2|ttc|otf)(\?\S*)?$/,
            loader: 'file-loader'
        },
        {
            test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
            loader: 'file-loader',
            query: {
                name: '[name].[ext]?[hash]'
            }
        },
        ]
    },
}


if (Mode === buildEnv.production) {
    module.exports.devtool = 'source-map';//при сборке бандла создается map скрипт который нужен чтобы в отладке каждый модуль выглядел как отдельный файл. Иначе сложно дебажить     
    module.exports.optimization= { //минимизация скриптов
        minimize: true
      };
}