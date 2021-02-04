const text2md = (str: any, style: string, start: any, end: any) => {
	// 截取选中字符串
	var arr = str.split("");
	var md: string;
	var selectedLength = end - start;
	var selectedStr = arr.splice(start, selectedLength).join("");
	var selector: {
		[tag: string]: string;
	} = {
		h1: "# " + selectedStr,
		h2: "## " + selectedStr,
		h3: "### " + selectedStr,
		bold: `**${selectedStr}**`,
		code: `\`${selectedStr}\``,
		italic: `_${selectedStr}_`,
		clear: `~~${selectedStr}~~`,
		underline: `<u>${selectedStr}</u>`,
		link: `[链接文字](链接)`,
		enter: `  <br>\n`,
		list: `* ${selectedStr}`,
		image: `![alt 属性文本](图片地址)`,
	};
	md = selector[style] || "8888";
	arr.splice(start, 0, md);
	return arr.join("");
};

export default text2md;
