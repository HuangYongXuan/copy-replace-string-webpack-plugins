# copy-replace-string-webpack-plugins

Plug-in to copy and modify file content

## install

`yarn add copy-modify-webpack-plugin`
or
`npm install copy-modify-webpack-plugin`

## how to use

```javascript
const CopyModifyWebpackPlugins = require('copy-modify-webpack-plugins');

new CopyModifyWebpackPlugins({
	entry: './index.js',
	output: `./dir/index.js`,
	callback: content => content.replace('searchValue', 'replacer')
})
```