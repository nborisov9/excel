const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// process.env.NODE_ENV  /  говоирт в каком режиме запускается проект  /  отвечает за то в каком режиме мы находимся
const isProd = process.env.NODE_ENV === 'production'; // режим production
const isDev = !isProd; // режим development

// если dev разработка, то файлы прописываются без hash, если prod разработка то с hash
const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`;

const jsLoaders = () => {
	const loaders = [
		{
			loader: 'babel-loader',
			options: {
				presets: ['@babel/preset-env']
			}
		}
	];

	if (isDev) {
		loaders.push('eslint-loader');
	}

	return loaders;
};

module.exports = {
	context: path.resolve(__dirname, 'src'), // установка пути к исходникам / context - устанавливает автоматческий путь до папки с исходниками
	mode: 'development',
	entry: ['@babel/polyfill', './index.js'], // указываме входные точки для приложения / @babel/polyfill - чтобы работали async await
	output: { // указываем файлы с production версией
		filename: filename('js'), // где лежат все собранные JS файлы
		path: path.resolve(__dirname, 'dist')
	},
	resolve: {
		extensions: ['.js'], // по умолчанию грузим такие файлы как .js
		alias: {
			'@': path.resolve(__dirname, 'src'), // чтобы не писать такие пути ../../ ... | @-значит то, что сразу переходим в папку src
			'@core': path.resolve(__dirname, 'src/core'),
		}
	},
	devtool: isDev ? 'source-map' : false, // добавит к js и css файлы .map
	devServer: {
		port: 999,
		hot: isDev
	},
	plugins: [
		new CleanWebpackPlugin(), // чистит папку dist
		new HTMLWebpackPlugin({
			template: 'index.html', // откуда берем шаблон для html
			minify: { // минимизировтаь
				removeComments: isProd, // удаление комментариев в html ( если это продакшн сборка )
				collapseWhitespace: isProd, // удаление пробелов в html  ( если это продакшн сборка )
			}
		}),
		new CopyPlugin({ // позволяет использовать разные файлы в папке production dist
			patterns: [
			  {
				  from: path.resolve(__dirname, 'src/favicon.ico'),
				  to: path.resolve(__dirname, 'dist')
			  },
			],
		 }),
	 	new MiniCssExtractPlugin({ // выносит стили из JS в отдельный css файл
			 filename: filename('css')
		 })
	],
	module: {
		rules: [
			{
			  test: /\.s[ac]ss$/i,
			  use: [
				{
					loader: MiniCssExtractPlugin.loader,
					options: {
						hmr: isDev,
						reloadAll: true
					}
				},
				'css-loader',
				'sass-loader',
			  ],
			},
			{ // babel
				test: /\.js$/,
				exclude: /node_modules/,
				use: jsLoaders()
			}
		 ]
	}
};