import React, { useState, useEffect } from 'react'
import { snackbar } from 'mdui'
import ClipboardJS from 'clipboard'
import FileRead from '../../components/FileReader'
import pathToTree from './engine'

export default () => {
    const [fileList, setFileList] = useState([]);
    useEffect(() => {
        var clipboard = new ClipboardJS('.copy');
        clipboard.on('success', e => {
            snackbar({ message: '已复制' })
            e.clearSelection();
        })
        return () => clipboard && clipboard.destroy();
    })
    const tree = pathToTree(fileList);
    return (
        <>
            <center>
                <FileRead
                    multiple={false}
                    maxWidth="140px"
                    text="选择文件夹"
                    onFileChange={(_, _file, fileList) => {
                        var result = [];
                        for (var i = 0; i < fileList.length; i++) {
                            result.push(fileList[i].webkitRelativePath)
                        }
                        setFileList(result)
                    }}
                    webkitdirectory="true"
                />
            </center>
            <br></br>
            <div className={`${fileList.length === 0 ? 'hidden' : ''} mdui-typo`}>
                <button data-clipboard-text={tree} className="copy mdui-btn mdui-btn-icon">
                    <i className="mdui-icon material-icons">&#xe14d;</i>
                </button>
                <pre>{tree}</pre>
            </div>
        </>
    )
}