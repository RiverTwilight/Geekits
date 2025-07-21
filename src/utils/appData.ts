import matter from "gray-matter";
import externalApps_zhCN from "../data/zh-CN/externalApps";
import externalApps_enUS from "../data/en-US/externalApps";
import type { AppData } from "@/types/index";

declare const require: {
	/**
	 * require.context(directory, useSubdirectories, regExp) 方法用于在 Webpack 中动态加载模块。
	 * @param directory - 目录路径
	 * @param useSubdirectories - 是否递归子目录
	 * @param regExp - 匹配文件的正则表达式
	 * @returns 返回一个对象，包含 keys() 方法和默认导出方法
	 * keys() 方法返回一个数组，包含所有匹配的文件路径
	 * @example
	 * const context = require.context('./locales', true, /\.json$/);
	 * const locales = context.keys().map(context);
	 * // locales 将包含所有匹配的 JSON 文件内容
	 * @see https://webpack.js.org/api/module-methods/#requirecontext
	 */
	context(
		directory: string,
		useSubdirectories: boolean,
		regExp: RegExp
	): {
		keys(): string[];
		(id: string): any;
	};
	(id: string): { default: string };
};

const getAppConfigFile = (appId: string, locale: string): string =>
	require(`../apps/${appId}/README.${locale}.md`).default;

/**
 * @param appId - 应用 id
 * @param config - 请求的 app 配置，如 `name`, `status`, `platform`
 * @returns 返回一个对象，包含默认的配置和请求的配置
 */
const getAppConfig = (
	appId: string,
	config: {
		requiredKeys?: string[];
		locale?: string;
	} = { locale: "zh-CN" }
): { [key: string]: any } => {
	/**
	 * 使用 gray-matter 解析应用配置文件：
	 * - `data`: 从文件头部 front-matter 中提取的元数据对象（通常是配置参数）
	 * - `content`: 文件的主体内容（通常是 Markdown 或纯文本内容）
	 */
	const { content, data } = matter(getAppConfigFile(appId, config.locale));

	const defaultConfig = {
		platform: ["web", "ios", "android"],
	};

	if (!config.requiredKeys) {
		return { ...defaultConfig, id: appId, ...data };
	}

	/**
	 * 根据 `requiredKeys` 从 `data` 中提取必要的配置项，
	 * 如果某个键不存在，则使用 `null` 作为默认值。
	 */
	const loadedConfig = config.requiredKeys.reduce(
		(acc, key) => {
			acc[key] = data[key] || null;
			return acc;
		},
		{ id: appId }
	);

	return { ...defaultConfig, ...loadedConfig };
};

/**
 * @param appId - 应用 id
 * @param locale - 设备语言信息
 * @returns 返回一个字符串，内容是该应用的 README 文档
 */
const getAppDoc = (
	appId: string,
	locale?: string
): string | { [locale: string]: string } => {
	if (!locale) {
		return {
			"zh-CN": matter(getAppConfigFile(appId, "zh-CN")).content,
			"en-US": matter(getAppConfigFile(appId, "en-US")).content,
		};
	}

	const { content } = matter(getAppConfigFile(appId, locale));
	return content.toString();
};

const allAppsContext = require.context("../apps", true, /(zh-CN\.md)$/);
const allAppsContext_en = require.context("../apps", true, /(en-US\.md)$/);

const getAllApps = (
	includeExternal: boolean = true,
	locale?: string
): AppData[] => {
	const appsContext = { ...allAppsContext, allAppsContext_en };

	// appsContext.keys() 一半是相对路径，另一半是绝对路径，取前一半
	const allApps = appsContext
		.keys()
		.slice(0, appsContext.keys().length / 2)
		.map((key) => {
			const appId = key.split("/")[1];

			if (!locale) {
				return ["zh-CN", "en-US"].map((locale) => {
					return {
						id: appId,
						locale,
						...getAppConfig(appId, { locale }),
					};
				});
			}

			return [{ id: appId, locale, ...getAppConfig(appId, { locale }) }];
		})
		.flat(1);

	let externalApps = [];

	switch (locale) {
		case "zh-CN":
			externalApps = externalApps_zhCN;
			break;
		case "en-US":
			externalApps = externalApps_enUS;
			break;
		default:
			externalApps = externalApps_zhCN;
	}

	return includeExternal
		? [...allApps, ...externalApps]
		: (allApps as AppData[]);
};

export { getAllApps, getAppConfig, getAppDoc };
