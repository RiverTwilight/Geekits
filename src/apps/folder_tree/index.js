import React, { useState, useEffect } from 'react'
import { snackbar } from 'mdui'
import ClipboardJS from 'clipboard'
import FileRead from '../../components/FileReader'
import Input from '../../components/Input'
import pathToTree from './engine'

export default () => {
    const [fileList, setFileList] = useState([]);
    const [except, setExcept] = useState('');
    const [tree, setTree] = useState('')
    useEffect(() => {
        var clipboard = new ClipboardJS('.copy');
        clipboard.on('success', e => {
            snackbar({ message: '已复制' })
            e.clearSelection();
        })
        return () => clipboard && clipboard.destroy();
    }, [])
    return (
        <>
            <center>
                <FileRead
                    multiple={true}
                    maxWidth="200px"
                    onFileChange={(_, _file, fileList) => {
                        var result = [];
                        for (var i = 0; i < fileList.length; i++) {
                            result.push(fileList[i].webkitRelativePath)
                        }
                        setFileList(result)
                    }}
                    webkitdirectory={true}
                />
            </center>
            <Input
                value={except}
                onValueChange={setExcept}
                rows="5"
                placeholder="排除的文件夹/文件，一行一个"
            />
            <button className="mdui-btn mdui-color-theme" onClick={() => {
                setTree(pathToTree(fileList, except.split('\n')));
            }}>生成</button>
            <button data-clipboard-text={tree} className={`${tree === '' ? 'hidden' : ''} copy mdui-btn mdui-btn-icon`}>
                <i className="mdui-icon material-icons">&#xe14d;</i>
            </button>
            <br></br>
            <div className={`${tree === '' ? 'hidden' : ''} mdui-typo`}>
                <pre>{tree}</pre>
            </div>
        </>
    )
}
