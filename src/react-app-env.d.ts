/// <reference types="react-scripts" />

interface Window {
    globalRef: any,
    /**
     * 修改文档标题和头部标题
     */
    updateTitle(pageName: string | null): void,
    loadShow(): void;
    leftDrawer: any;
    /**
     * 隐藏加载动画
     */
    loadHide(): void
}

declare module 'gif.js' {
    class GIF {
        constructor(config);
        public addFrame(videoDom, config)
        public render()
        public on(eventName, cb)
    }
    export = GIF;
}
