/**
 * @module      copy-modify-webpack-plugin
 * @author      nayoayo
 * @date        2021/6/30 8:00 上午
 * @version     1.0
 */
const path = require('path');
const fs = require('fs');
const pluginName = 'copy-modify-webpack-plugin';

class CopyModifyWebpackPlugin  {

	/**
	 * @param options {[{entry: string, output: string, callback: function }]}
	 * @constructor
	 */
	constructor(options) {
		this.options = options
	}

	apply(compiler) {
		let self = this;
		let folder = compiler.options.context;
		compiler.hooks.done.tap(pluginName, () => {
			this.options.forEach((option) => {
				let entry = path.join(folder, option.entry);
				let output = path.join(folder, option.output);
				fs.readFile(entry, 'utf8', function (err, data) {
					if (option.callback) {
						data = option.callback(data);
					}
					fs.writeFileSync(output, data);
				});
			})
		});
	}
}

module.exports = CopyModifyWebpackPlugin;
