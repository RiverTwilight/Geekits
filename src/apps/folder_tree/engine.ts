export default function pathsToTree(fileList: any, exceptList: any) {
	let result = {
		name: "_root",
		children: [],
	};
	console.log(exceptList);
	const correctFileList: any = [];
	fileList.map((path: any) => {
		let absolutePath = "." + path.substr(path.indexOf("/"));
		let willBeExcept = false;
		for (let except of exceptList) {
			console.log(absolutePath);
			if (absolutePath.match(except) && except !== "")
				willBeExcept = true;
		}
		!willBeExcept && correctFileList.push(path);
	});
	console.log(correctFileList);
	for (let path of correctFileList) {
		console.group("pathList");
		console.log("path", path);
		console.groupEnd();
		if (path.includes("/")) {
			// 文件夹
			let paths = path.split("/");
			let currentPath = result;

			for (let i = 0; i < paths.length; i++) {
				let p = paths[i];
				console.log("item", p);
				let findItem = currentPath.children.find(
					(item) => item.name === p
				);
				//如果这一项已经存在，那么不理他
				if (findItem) {
					currentPath = findItem;
				} else {
					//如果这一项不存在，新建一个folder
					let isFile = i === paths.length - 1; //是否为最后一项（文件）
					let folder = {
						type: isFile ? "file" : "folder",
						name: p,
					};
					if (!isFile) {
						// @ts-expect-error ts-migrate(2339) FIXME: Property 'children' does not exist on type '{ type... Remove this comment to see the full error message
						folder.children = [];
					}
					// @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ type: string; name: any; }' is... Remove this comment to see the full error message
					currentPath.children.push(folder);
					// @ts-expect-error ts-migrate(2741) FIXME: Property 'children' is missing in type '{ type: st... Remove this comment to see the full error message
					currentPath = folder;
				}
			}
		} else {
			// 文件
			result.children.push({
				// @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
				type: "file",
				// @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
				name: path,
			});
		}
	}
	return decoration(result.children);
}

function decoration(fileListObj: any) {
	console.log(fileListObj);

	const addSymbol = (folder: any) => {
		var space = Array(spaceNum).fill("     ").join("");
		folder.map((obj: any, i: any, correctFolder: any) => {
			if (obj.type === "file") {
				if (!correctFolder[i + 1]) {
					//最后一个文件
					graph += `${space}└── ${obj.name}\n`;
					spaceNum--;
				} else {
					graph += `${space}├── ${obj.name}\n`;
				}
			} else if (obj.type === "folder") {
				if (!correctFolder[i - 1]) {
					graph += `${space}${obj.name}\n`;
				} else {
					graph += `${space}└── ${obj.name}\n`;
				}
				spaceNum++;
				addSymbol(correctFolder[i].children);
			}
		});
	};
	var graph = "";
	var spaceNum = 0;
	addSymbol(fileListObj);
	return graph;
}
