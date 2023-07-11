import matter from "gray-matter";
import externalApps from "../data/zh-CN/externalApps";
import type { AppData } from "@/types/index";

const getAppConfigFile = (appId: string): string =>
	require(`../apps/${appId}/README.zh-CN.md`).default;

const getAppConfig = (
	appId: string,
	requiredKeys?: string[]
): { [key: string]: any } => {
	const { content, data } = matter(getAppConfigFile(appId));

	if (!requiredKeys) {
		return { id: appId, ...data };
	}

	return requiredKeys.reduce(
		(acc, key) => {
			acc[key] = data[key] || null;
			return acc;
		},
		{ id: appId }
	);
};

const getAppDoc = (appId: string): string => {
	const { content } = matter(getAppConfigFile(appId));
	return content.toString();
};

const allAppsContext = require.context("../apps", true, /(zh-CN\.md)$/);

const getAllApps = (includeExternal?: boolean): AppData[] => {
	console.log(allAppsContext.keys())
	const allApps = allAppsContext
		.keys()
		.slice(0, (allAppsContext.keys().length) / 2)
		.map((key) => {
			const appId = key.split("/")[1];
			return { id: appId, ...getAppConfig(appId) };
		});

	return includeExternal ? [...allApps, ...externalApps] : allApps;
};

export { getAllApps, getAppConfig, getAppDoc };
