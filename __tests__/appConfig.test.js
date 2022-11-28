describe("Apps Config Validation", () => {
	it("Include all keys", () => {
		const appConfig = require("../src/data/i18n/zh-CN/appData");

		appConfig.forEach((app) => {
			expect(app).toHaveProperty("status");
		});
	});
});
