describe("Apps Config Validation", () => {
	const appConfig = require("../src/data/i18n/zh-CN/appData");

	it("Include all keys", () => {
		appConfig.forEach((app) => {
			expect(app).toHaveProperty("name");
			expect(app).toHaveProperty("status");
			expect(app).toHaveProperty("link");
		});
	});

	it("Valid status", () => {
		appConfig.forEach((app) => {
			expect(
				["external", "stable", "beta", "alpha"].includes(app.status)
			).toEqual(true);
		});
	});
});
