import { TLang } from "@/types/index";
import { getAllApps } from "./appData";

export default (locale: TLang, processId?: (id: string) => string) => {
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
