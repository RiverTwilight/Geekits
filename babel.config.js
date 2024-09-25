// babel.config.js
module.exports = {
	presets: [
		"@babel/preset-env", // Ensure you have this preset for ES6+ support
		"@babel/preset-react", // {{ edit_1 }} Add this line for JSX support
		"@babel/preset-typescript", // Add this line for TypeScript support
	],
};
