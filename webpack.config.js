const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: [
    '@babel/polyfill', // enables async-await
    './client/index.js'
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.scss',
      '.gif',
      '.png',
      '.jpg',
      '.jpeg',
      '.svg'
    ]
  },
  devtool: 'source-map',
  watchOptions: {
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: 'url-loader'
        }
      }
      //Here
      //  {
      //    test: /\.(gif|png|jpe?g|svg)$/i,
      //    use: [
      //      'file-loader',
      //      {
      //        loader: 'image-webpack-loader',
      //        options: {
      //          mozjpeg: {
      //            progressive: true,
      //            quality: 65,
      //          },
      //          optipng: {
      //            enabled: !isDevelopment,
      //          },
      //          pngquant: {
      //            quality: '65-90',
      //            speed: 4,
      //          },
      //          gifsicle: {
      //            interlaced: false,
      //          },
      //          webp: {
      //            quality: 75,
      //          },
      //        },
      //      },
      //    ],
      //  },
    ]
  }
}
