export default function pathsToTree(fileList) {
    let result = {
        name: '_root',
        children: []
    }
    for (let path of fileList) {
        console.log('path', path)
        if (path.includes('/')) { // 文件夹
            let paths = path.split('/')
            let currentPath = result

            for (let i = 0; i < paths.length; i++) {
                let p = paths[i]
                console.log('item', p)
                let findItem = currentPath.children.find(item => item.name === p)
                //如果这一项已经存在，那么不理他
                if (findItem) {
                    currentPath = findItem
                } else {
                    //如果这一项不存在，新建一个folder
                    let isFile = i === paths.length - 1//是否为最后一项（文件）
                    let folder = {
                        type: isFile ? 'file' : 'folder',
                        name: p,
                    }
                    if (!isFile) {
                        folder.children = []
                    }
                    currentPath.children.push(folder)
                    currentPath = folder
                }
            }
        } else { // 文件
            result.children.push({
                type: 'file',
                name: path
            })
        }
    }
    return (decoration(result.children))
}

function decoration(fileListObj) {
    console.log(fileListObj);
    const addSymbol = (folder) => {
        var space = Array(spaceNum).fill(' ').join('');
        folder.map((obj, i, correctFolder) => {
            if (obj.type === 'file') {
                if (!correctFolder[i + 1]) {
                    graph += `${space}└ ${obj.name}\n`;
                    spaceNum--
                } else {
                    graph += `${space}├ ${obj.name}\n`
                }
            } else if (obj.type === 'folder') {
                if (!correctFolder[i - 1]) {
                    graph += `${space}${obj.name}\n`;
                } else {
                    graph += `${space}└ ${obj.name}\n`;
                }
                spaceNum++
                addSymbol(correctFolder[i].children)
            }
        })
    }
    var graph = '';
    var spaceNum = 0;
    addSymbol(fileListObj)
    return graph
}