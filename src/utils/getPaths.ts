import { getAllApps } from "./appData";

export default (locale, processId: (id: string) => string, path: string) => {
	const allApps = getAllApps();

	const paths = allApps.map((app) => {
		return {
			params: {
				id: app.id,
			},
			locale,
		};
	});

	return paths;
};
