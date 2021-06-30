/**
 * @author hyx
 * @date 2021-06-28 12:12
 */
const path = require('path');
const fs = require('fs');

function Index(config) {
	this.entry = config.entry;
	this.output = config.output;
	this.callback = config.callback;
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