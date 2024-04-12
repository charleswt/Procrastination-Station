const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './utils/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CopyPlugin({
        patterns: [
            { from: "robots.txt", to: "robots.txt" },
        ],
    }),
    new HtmlWebpackPlugin({
      title: 'homepage',
      template: 'public/html/index.html',
      filename: 'homepage.html',
      minify: true
    }),
    new InjectManifest({
      swSrc: './src-sw.js',
      swDest: './src-sw.js',
      maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
    }),
    
      // Creates a manifest.json file.
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'App',
        short_name: 'App',
        description: '',
        background_color: '#333',
        theme_color: '#fff',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.webp'),
            sizes: [110, 144],
            destination: path.join('assets', 'images'),
          },
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [512],
            destination: path.join('assets', 'images'),
          },
          {
            "src": "src/images/logo.webp",
            "sizes": "196x196",
            "type": "image/webp",
            "purpose": "maskable"
          }
        ],
      }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico|webp)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:6].[ext]',
              outputPath: 'images',
              publicPath: 'images',
              emitFile: true,
              esModule: false
            }
          },
          {
            loader: 'webp-loader'
          }
        ]
      }
    ],
  },
};