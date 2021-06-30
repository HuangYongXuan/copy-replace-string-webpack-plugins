/**
 * @module      12
 * @author      nayoayo
 * @date        2021/6/30 8:00 上午
 * @version     1.0
 */
const path = require('path');
const fs = require('fs');

/**
 * @param options {{entry: string, output: string, callback: function }}
 * @constructor
 */
function Index(options) {
	this.entry = options.entry;
	this.output = options.output;
	this.callback = options.callback;
}

Index.prototype.apply = function (compiler) {
	let self = this;
	let folder = compiler.options.context;
	let entry = path.join(folder, self.entry);
	let output = path.join(folder, self.output);

	fs.readFile(entry, 'utf8', function (err, data) {
		compiler.plugin('done', function () {
			if (self.callback) {
				data = self.callback(data);
			}
			fs.writeFileSync(output, data);
		});
	});
}

module.exports = Index;