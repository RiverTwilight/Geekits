interface TreeNode {
	name: string;
	type?: 'file' | 'folder';
	children?: TreeNode[];
}

interface TreeFolder extends TreeNode {
	type: 'folder';
	children: TreeNode[];
}

interface TreeFile extends TreeNode {
	type: 'file';
}

export default function pathsToTree(fileList: string[], exceptList: string[]): string {
	let result: TreeNode = {
		name: '_root',
		children: [],
	};
	console.log(exceptList);
	const correctFileList = fileList.filter(path => {
		const absolutePath = '.' + path.substr(path.indexOf('/'));
		return !exceptList.some(except => except !== '' && absolutePath.match(except));
	});
	console.log(correctFileList);
	for (const path of correctFileList) {
		console.group("pathList");
		console.log("path", path);
		console.groupEnd();
		if (path.includes('/')) {
			// 文件夹
			const paths = path.split('/');
			let currentPath = result;

			for (let i = 0; i < paths.length; i++) {
				const p = paths[i];
				console.log("item", p);
				const isFile = i === paths.length - 1;

				// Type assertion to access children
				const current = currentPath as TreeFolder;
				let findItem = current.children?.find(
					item => item.name === p
				) as TreeFolder | undefined;

				if (findItem) {
					currentPath = findItem;
				} else {
					//如果这一项不存在，新建一个folder
					const newNode: TreeNode = {
						type: isFile ? 'file' : 'folder',
						name: p,
					};

					if (!isFile) {
						(newNode as TreeFolder).children = [];
					}

					current.children = current.children || [];
					current.children.push(newNode);
					currentPath = newNode;
				}
			}
		} else {
			// 文件
			const fileNode: TreeFile = {
				type: 'file',
				name: path,
			};
			(result as TreeFolder).children.push(fileNode);
		}
	}
	return decoration(result.children || []);
}

function decoration(fileListObj: TreeNode[]): string {
	console.log(fileListObj);

	let graph = '';
	let spaceNum = 0;

	const addSymbol = (folder: TreeNode[]) => {
		const space = Array(spaceNum).fill('     ').join('');
		
		folder.forEach((obj, i, correctFolder) => {
			if (obj.type === 'file') {
				if (!correctFolder[i + 1]) {
					//最后一个文件
					graph += `${space}└── ${obj.name}\n`;
					spaceNum--;
				} else {
					graph += `${space}├── ${obj.name}\n`;
				}
			} else if (obj.type === 'folder') {
				if (!correctFolder[i - 1]) {
					graph += `${space}${obj.name}\n`;
				} else {
					graph += `${space}└── ${obj.name}\n`;
				}
				spaceNum++;
				const folderNode = obj as TreeFolder;
				if (folderNode.children) {
					addSymbol(folderNode.children);
				}
			}
		});
	};

	addSymbol(fileListObj);
	return graph;
}
