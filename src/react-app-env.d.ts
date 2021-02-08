/// <reference types="react-scripts" />

interface AppInfo {
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
	loadShow(): void;
	loadingDelay: Timeout;
	setHeaderButton: (component: any) => void;
	/**
	 * 隐藏加载动画
	 */
	loadHide(): void;
	setRightDrawer(content, icon?): void;
	destoryRightDrawer(): void;
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
