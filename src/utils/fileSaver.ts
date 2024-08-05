import { Capacitor } from "@capacitor/core";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Share } from "@capacitor/share";

const saveFileObjOnWeb = (
	fileObj: File,
	type: string,
	filename?: string
): void => {
	const url = URL.createObjectURL(fileObj);
	const name =
		filename ||
		new Date()
			.toISOString()
			.slice(0, 19)
			.replace("T", " ")
			.replace(" ", "_")
			.replace(/:/g, "-") +
			"." +
			type;
	var a = document.createElement("a");
	a.style.display = "none";
	a.download = name;
	a.href = url;
	document.body.appendChild(a);
	a.click();
};

const saveBase64OnNative = async (
	filename: string,
	type: string,
	base64: string
) => {
	const cachedFile = await Filesystem.writeFile({
		path: `${filename}.${type}`,
		data: base64,
		directory: Directory.Cache,
		recursive: true,
	});

	await Share.share({
		title: "Share PDF",
		files: [cachedFile.uri],
	});
};

async function blobToDataURI(blob: Blob, callback: (file: File) => void) {
	var reader = new FileReader();
	reader.readAsDataURL(blob);
	reader.onload = (e) => {
		if (!e.target) throw Error;
		callback && callback(dataURLtoFile(e.target.result));
	};
}

function dataURLtoFile(dataurl: any, filename?: string): File {
	//将base64转换为文件
	var arr = dataurl.split(","),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new File([u8arr], filename || "未命名", {
		type: mime,
	});
}

const blobToBase64 = (blob: Blob): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(blob);
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = (error) => reject(error);
	});
};

/**
 * 保存文件
 * @param {object} config
 * **type**:文件后缀
 * **file**:Blob 或 String
 */
const saveFile = async (config: {
	filename: string;
	type: string;
	file: Blob | string;
}) => {
	const { file, filename, type } = config;

	if (typeof file === "object") {
		if (Capacitor.isNativePlatform()) {
			saveBase64OnNative(filename, type, await blobToBase64(file));
		} else {
			blobToDataURI(file, (fileObj) => {
				saveFileObjOnWeb(fileObj, type, filename);
			});
		}
		// switch(/\[object\s(\S+)\]/.exec(file.toString())[1]){
	} else {
		if (Capacitor.isNativePlatform()) {
			saveBase64OnNative(filename, type, file);
		} else {
			saveFileObjOnWeb(dataURLtoFile(file, filename), type, filename);
		}
	}
};

export { dataURLtoFile, saveFile };
export default saveFile;
