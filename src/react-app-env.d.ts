/// <reference types="react-scripts" />

interface Window {
    globalRef: any,
    /**
     * 修改文档标题和头部标题
     */
    updateTitle(pageName: string | null): void,
    loadShow(): void;
    /**
     * 隐藏加载动画
     */
    loadHide(): void
}
