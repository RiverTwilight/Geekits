import matter from "gray-matter";
import type { AppData } from "@/types/index";

const getConfigFile = (appId: string): string =>
	require("../apps/" + appId + "/README.zh-CN.md").default;

const getAppConfig = (
	appId: string,
	requireKeys?: string[]
): { [key: string]: any } => {
	const config = matter(getConfigFile(appId)).data;

	var data = {
		id: appId,
	};

	if (!requireKeys) {
		return Object.assign(data, config);
	}

	requireKeys.forEach((key) => {
		data[key] = config[key];
	});

	return data;
};

const getAppDoc = (appId: string): string => {
	const docFile = getConfigFile(appId);

	return matter(docFile).content.toString();
};

const getAllApps = (): AppData[] => {
	const allApps: AppData[] = ((context) => {
		const keys = context.keys();
		// const values = keys.map(context);

		return keys.slice(0, (keys.length - 1) / 2).map((key: string) => {
			const appId = key.split("/")[1];
			return Object.assign({ id: appId }, getAppConfig(appId));
		});
	})(require.context("../apps", true, /(zh-CN\.md)$/));

	return allApps;
};

export { getAllApps, getAppConfig, getAppDoc };
