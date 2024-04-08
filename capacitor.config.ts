import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
	appId: "com.ygeeker.geekits",
	appName: "Geekits",
	webDir: "out",
	server: {
		androidScheme: "https",
		errorPath: "/500.html",
	},
};

export default config;
