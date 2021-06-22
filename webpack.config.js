'use strict';
const path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  mode: 'development',
	entry: './src/index.browser.ts',
	output: {
		filename: 'skyekiwi.browser.js',
		path: path.resolve(__dirname, 'dist')
	},
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.tsx', '.js' ]
  }
};
