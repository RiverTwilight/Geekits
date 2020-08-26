import { useEffect } from "react";

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
		// @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
		var dataFile = e.dataTransfer.files[0];
		var fr = new FileReader();
		// @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
		if (e.dataTransfer.files[0].type.match(/text\/.+/)) {
			fr.readAsText(dataFile, "gb2312");
		} else {
			fr.readAsDataURL(dataFile);
		}
		getEventCb && getEventCb(e);
		fr.onload = () => {
			// @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
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
