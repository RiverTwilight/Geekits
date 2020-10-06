const text2md = (str: any, style: any, start: any, end: any) => {
	// 截取选中字符串
	var arr = str.split("");
	var md;
	var selectedLength = end - start;
	var selectedStr = arr.splice(start, selectedLength).join("");
	// TODO 使用对象选择法
	switch (style) {
		case "h1":
			md = "# " + selectedStr;
			break;
		case "h2":
			md = "## " + selectedStr;
			break;
		case "h3":
			md = "### " + selectedStr;
			break;
		case "bold":
			md = `**${selectedStr}**`;
			break;
		case "code":
			md = `\`${selectedStr}\``;
			break;
		case "italic":
			md = `_${selectedStr}_`;
			break;
		case "clear":
			md = `~~${selectedStr}~~`;
			break;
		case "underline":
			md = `<u>${selectedStr}</u>`;
			break;
		case "link":
			md = `[链接文字](链接)`;
			break;
		case "enter":
			md = `  <br>\n`;
			break;
		case "list":
			md = `* ${selectedStr}`;
			break;
		case "image":
			md = `![alt 属性文本](图片地址)`;
			break;
		default:
			md = "88888";
	}
	arr.splice(start, 0, md);
	return arr.join("");
};

export default text2md;
