module.exports = {
	typescript: {
		// !! WARN !!
		// Dangerously allow production builds to successfully complete even if
		// your project has type errors.
		// !! WARN !!
		ignoreBuildErrors: true,
	},
	images: {
		sizes: [320, 480, 820, 1200, 1600],
		domains: ["i.loli.net", "bgr.com"],
	},
	webpack: function (config) {
		config.module.rules.push({
			test: /\.md$/,
			use: "raw-loader",
		});
		config.module.rules.push({
			test: /\.ttf$/,
			use: "ttf-loader",
		});
		config.module.rules.push({
			test: /\.svg$/,
			// issuer: {
			//     test: /\.(js|ts)x?$/,
			// },
			use: ["@svgr/webpack"],
		});
		return config;
	},
	i18n: {
		locales: ["zh-CN"],
		defaultLocale: "zh-CN",
	},
};
