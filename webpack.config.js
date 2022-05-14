const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')
const SVGSpriteMapPlugin = require("svg-spritemap-webpack-plugin")

const DIST_PATH = `${__dirname}/dist`

module.exports = (env)  => {
	const isProduction = env.NODE_ENV === 'production'
	const watch = !!env.WATCH
	const svgMapPath = path.join(__dirname,"src","assets","images","vector","workspaceGallery","*.svg")

	return [
		{
			mode: env.NODE_ENV === 'production'? 'production' : 'development',
			entry: {
			},
			output: {
				path: path.resolve(__dirname, 'dist'),
				filename: '[name].js'
			},
			target: 'web',
			watch,
			plugins: [
				/* Make sure SVGSpriteMapPlugin comes before HtmlWebPackPlugin so the assets will be available for the HtmlWebPackPlugin*/
				new SVGSpriteMapPlugin(path.join(__dirname, "assets", "workspaceGallery","*.svg").replace(/\\/g,'/'), {
					output: {
						filename: `sprites/workspaceSprites.svg`,
						svgo: true
					},
					sprite: {
						prefix: false,
						generate: {
							title: false
						}
					}
				}),
				new HtmlWebPackPlugin({
					template: './public/index.ejs',
					filename: './index.html'
				})
			]
		}
	]
}
