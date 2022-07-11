/**
 * @module      12
 * @author      nayoayo
 * @date        2021/6/30 8:00 上午
 * @version     1.0
 */
const path = require('path');
const fs = require('fs');

/**
 * @param options {[{entry: string, output: string, callback: function }]}
 * @constructor
 */
function Index(options) {
	this.options = options
}

Index.prototype.apply = function (compiler) {
	let self = this;
	let folder = compiler.options.context;
	compiler.plugin('done', function () {
		self.options.forEach((option,index) => {
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

module.exports = Index;
