import { Toast } from "@capacitor/toast";
import { isWeb } from "./platform";

async function copyTextToClipboard(text) {
	if ("clipboard" in navigator) {
		return await navigator.clipboard.writeText(text);
	} else {
		return document.execCommand("copy", true, text);
	}
}

const handleCopy = (text) => {
	copyTextToClipboard(text)
		.then(async () => {
			if (isWeb()) {
				window.snackbar({ message: "已复制" });
			} else {
				await Toast.show({
					text: "已复制",
				});
			}
		})
		.catch((err) => {
			console.log(err);
		});
};

export default handleCopy;
