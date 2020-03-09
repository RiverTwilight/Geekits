const {
	override
} = require('customize-cra');

module.exports = function override(config, env) {
	config.mode = 'production';
	config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false // 生产环境关闭sourcemap关闭
	return config
}