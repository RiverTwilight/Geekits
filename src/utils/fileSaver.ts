// TODO 无法保存 via\QQ

const save = (fileObj: File, type: string, filename?: string): void => {
	const url = URL.createObjectURL(fileObj);
	//没有文件名使用日期
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

/**
 * 保存文件
 * @param {object} config
 * **type**:文件后缀
 * **file**:Blob或String
 */
const saveFile = async (config: {
	filename: string;
	type: string;
	file: Blob | string;
}) => {
	//统一转换成fileObj后保存
	const { file, filename, type } = config;
	if (typeof file === "object") {
		//switch(/\[object\s(\S+)\]/.exec(file.toString())[1]){
		blobToDataURI(file, (fileObj) => {
			save(fileObj, type, filename);
		});
	} else {
		save(dataURLtoFile(file, filename), type, filename);
	}
};

export { dataURLtoFile, saveFile };
export default saveFile;
