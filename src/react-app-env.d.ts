/// <reference types="react-scripts" />

interface Window {
	globalRef: any;
	/**
	 * 修改文档标题和头部标题
	 */
	updateTitle(pageName?: string): void;
	loadShow(): void;
	loadingDelay: Timeout;
	leftDrawer: any;
	RightDrawer: any;
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

type userInfoFromLocal = {
	username: string;
};

declare module "gif.js" {
	class GIF {
		constructor(config);
		public addFrame(videoDom, config);
		public render();
		public on(eventName, cb);
	}
	export = GIF;
}
