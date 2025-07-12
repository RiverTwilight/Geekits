/// <reference types="next" />

declare global {
	interface Window {
		scrollListener: any;
		/**
		 * 修改文档标题和头部标题
		 */
		updateTitle(pageName?: string): void;
		setDark(state: boolean): void;
		/**
		 * 显示加载动画
		 */
		snackbar(config: any): void;
		showGlobalLoadingOverlay(): void;
		loadingDelay: Timeout;
		setHeaderButton: (component: any) => void;
		/**
		 * 隐藏加载动画
		 */
		hideGlobalLoadingOverlay(): void;
		setRightDrawer(content, icon?): void;
		menu: any;
		loadingDelay: number;
		dialogInst: any;
		/**
		 * 番茄钟计时器
		 */
		tomato: any;
	}
}

export interface IChannel {
	name: string;
	Icon: JSX.Element | JSX.Element[];
}

export type AppData = {
	name: string;
	id: string;
	description?: string;
	seoOptimizedDescription?: string;
	// The path to the app's icon.
	icon?: string;
	// Only show stable and beta app
	status?: "stable" | "beta" | "alpha";
	channel?: "life" | "media" | "ai" | "dev" | "external";
	// The locale of the app
	locale?: string;
	keywords?: string[];
	/**
	 * @deprecated
	 * No longer needed. If you need implictly set the icon color,
	 * please use API
	 */
	icon_color?: string;
	network?: boolean;
	/**
	 * @deprecated
	 * No longer needed.
	 */
	link?: string;
	/**
	 * @deprecated
	 * Move desctipion to the app's entry file.
	 */
	help?: string;
	/**
	 * The platform of the app
	 *
	 * @default ["web", "ios", "android"]
	 */
	platform?: string[];
};

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

export type PageProps = {
	locale: string;
	currentPage: {
		title: string;
		path: string;
	};
};

declare module "*.svg" {
	const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
}
