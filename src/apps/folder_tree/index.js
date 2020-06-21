import React, { useState, useEffect } from 'react'
import { snackbar } from 'mdui'
import ClipboardJS from 'clipboard'
import FileRead from '../../components/FileReader'
import Input from '../../components/Input'
import pathToTree from './engine'

/**
 * @TODO 排除列表
 */

export default () => {
    const [fileList, setFileList] = useState([]);
    const [except, setExcept] = useState('')
    useEffect(() => {
        var clipboard = new ClipboardJS('.copy');
        clipboard.on('success', e => {
            snackbar({ message: '已复制' })
            e.clearSelection();
        })
        return () => clipboard && clipboard.destroy();
    })
    const tree = pathToTree(fileList, except.split('\n'));
    return (
        <>
            <center>
                <FileRead
                    multiple={true}
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
            {/*<Input
                value={except}
                onValueChange={setExcept}
                rows="5"
                placeholder="排除的路径，一行一个"
            />*/}
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
