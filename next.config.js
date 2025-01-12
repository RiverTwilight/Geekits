const withPWA = require("next-pwa")({
	dest: "public",
	register: true,
	skipWaiting: true,
});

const isCapacitor = process.env.CAPACITOR_BUILD === "true";

module.exports = withPWA({
	...(isCapacitor && { output: "export" }),
	...(!isCapacitor && {
		i18n: {
			locales: ["zh-CN", "en-US"],
			defaultLocale: "en-US",
		},
	}),
	typescript: {
		// !! WARN !!
		// Dangerously allow production builds to successfully complete even if
		// your project has type errors.
		// !! WARN !!
		ignoreBuildErrors: true,
	},
	images: {
		imageSizes: [320, 480, 820, 1200, 1600],
		domains: ["i.loli.net", "bgr.com", "www.ygeeker.com", "ygeeker.com"],
		unoptimized: isCapacitor,
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
});
