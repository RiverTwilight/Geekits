async function copyTextToClipboard(text) {
	if ("clipboard" in navigator) {
		return await navigator.clipboard.writeText(text);
	} else {
		return document.execCommand("copy", true, text);
	}
}

const handleCopy = (text) => {
	copyTextToClipboard(text)
		.then(() => {
			window.snackbar({ message: "已复制" });
		})
		.catch((err) => {
			console.log(err);
		});
};

export default handleCopy;
