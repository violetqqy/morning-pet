const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
// 定义了一些文件夹的路径
const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'app');
const BUILD_PATH = path.resolve(ROOT_PATH, 'build');
// Template的文件夹路径
const TEM_PATH = path.resolve(APP_PATH, 'pages');

module.exports = {
  // 配置Server
  devServer: {
    contentBase: APP_PATH,
    historyApiFallback: true,
    hot: true,
    inline: true,
    compress: true,
    port: 9000,
    // host: '192.168.0.106'
    // 接口地址代理
    // proxy: {
    //   '/api/*': {
    //     target: 'http://localhost:5000',
    //     secure: false
    //   }
    // }
  },
  // 项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
  entry: {
    main: path.resolve(APP_PATH, 'main.js'),
    // 添加要打包在vendors里面的库
    vendors: ['jquery', 'swiper']
  },
  // 输出的文件名 合并以后的js会命名为[name].[hash].js
  output: {
    path: BUILD_PATH,
    filename: '[name].[hash].js'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        use: ['css-loader']
      })
    }, {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        use: ['css-loader', 'sass-loader']
      })
    }, {
      test: /\.(png|jpg|ico)$/,
      loader: 'url-loader?limit=10000'
    }, {
      test: /\.jsx?$/,
      loader: 'babel-loader',
      include: APP_PATH,
      query: {
        presets: ['es2015']
      }
    }]
  },
  // 添加我们的插件 会自动生成一个html文件
  plugins: [
    new ExtractTextPlugin({ filename: '[name].[hash].css', disable: false, allChunks: true }),
    // 这个使用uglifyJs压缩你的js代码
    // new webpack.optimize.UglifyJsPlugin({ minimize: true }),
    // 把入口文件里面的数组打包成verdors.js
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendors', filename: 'vendors.[hash].js' }),
    // 创建HtmlWebpackPlugin的实例，生成页面
    new HtmlWebpackPlugin({
      title: '主页',
      template: path.resolve(TEM_PATH, 'main.html'),
      filename: 'main.html',
      // chunks这个参数告诉插件要引用entry里面的哪几个入口
      chunks: ['main', 'vendors'],
      // 要把script插入到标签里
      inject: 'body'
    })
  ],
  devtool: 'eval-source-map'
};
