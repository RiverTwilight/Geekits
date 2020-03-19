const {
	override
} = require('customize-cra');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = function override(config, env) {
	config.plugins.push(
        new WorkboxPlugin.GenerateSW({
            cacheId: 'webpack-pwa', // 设置前缀
            skipWaiting: true, // 强制等待中的 Service Worker 被激活
            clientsClaim: true, // Service Worker 被激活后使其立即获得页面控制权
            swDest: 'service-worker.js', // 输出 Service worker 文件
            globPatterns: ['**/*.{html,js,css,png.jpg}'], // 匹配的文件
			globIgnores: ['service-worker.js'], // 忽略的文件
		})
	)
	config.mode = 'production';
	config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false // 生产环境关闭sourcemap关闭
	return config
}