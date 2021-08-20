/// <reference types="react-scripts" />

interface IApp {
	name: string;
	link: string;
	description?: string;
}

interface Window {
	/**
	 * 修改文档标题和头部标题
	 */
	updateTitle(pageName?: string): void;
	/**
	 * 显示加载动画
	 */
	snackbar(config: any): void;
	loadShow(): void;
	loadingDelay: Timeout;
	setHeaderButton: (component: any) => void;
	/**
	 * 隐藏加载动画
	 */
	loadHide(): void;
	setRightDrawer(content, icon?): void;
	menu: any;
	loadingDelay: number;
	dialogInst: any;
	/**
	 * 番茄钟计时器
	 */
	tomato: any;
}

// 本地用户信息
type userInfoFromLocal = {
	username: string;
};

/**
 * 修复gif.js的ts支持问题
 */
declare module "gif.js" {
	class GIF {
		constructor(config);
		public addFrame(videoDom, config);
		public render();
		public on(eventName, cb);
	}
	export = GIF;
}

export type IPost = {
	slug: string;
	defaultTitle: string;
	frontmatter: {
		date: string;
		/** 目录 */
		categories?: string[];
	};
	id: number;
	/** 文章 */
	markdownBody?: string;
};

interface Window {
	scrollListener: any;
}

export interface ICurrentPage {
	title: string;
	path: string;
	description?: string;
}

// 词典
export type TDictionary = {
	[dicIndex: string]: {
		[langIndex: number]: string;
	};
};

export type TLang = "zh-CN" | "en-US" | "jp";

export interface ISiteConfig {
	title: string;
	keywords: string[];
	description: string;
	root: string;
	author: {
		name: string;
		image?: string;
		github?: string;
		twitter?: string;
		intro: {
			title: string;
			content: string;
		}[];
	};
}

declare module "*.svg" {
	const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
}
