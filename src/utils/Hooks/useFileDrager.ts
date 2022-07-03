import { useEffect } from "react";

/**
 * 监听文件拖入事件
 * @param cb 文件读取完毕回调
 * @param getEventCb 事件回调
 */
const signListener = (cb: any, getEventCb?: any) => {
	document.ondragover = (e) => {
		e.preventDefault();
	};
	document.ondragenter = () => {
		//dropBox.style.background = '#888888'
	};
	document.ondragleave = () => {
		//dropBox.style.background = null
	};
	document.ondrop = (e) => {
		e.preventDefault();
		var dataFile = e.dataTransfer.files[0];
		var fr = new FileReader();
		if (e.dataTransfer.files[0].type.match(/text\/.+/)) {
			fr.readAsText(dataFile, "GB2312");
		} else {
			fr.readAsDataURL(dataFile);
		}
		getEventCb && getEventCb(e);
		fr.onload = () => {
			cb && cb(fr.result, dataFile, e.dataTransfer.files);
		};
	};
};

const removeListener = () => {
	document.ondrop = null;
	document.ondragleave = null;
	document.ondragenter = null;
	document.ondragenter = null;
};

const useFileDrager = (cb: any) => {
	useEffect(() => {
		signListener(cb);
		return removeListener;
	}, [cb]);
};

export default useFileDrager;

export { signListener, removeListener };
