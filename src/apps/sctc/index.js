import React from 'react'
import { snackbar } from 'mdui'
import dic from './dictionary'
import DragRead from '../../utils/DragReadContainer'
import Input from '../../components/Input.tsx'
import ClipboardJS from 'clipboard'

//结果展示框
function PrintRes(props) {
    return (
        <div className="mdui-col mdui-textfield">
            <textarea
                value={props.res}
                data-clipboard-text={String(props.res)}
                rows="5" id="becopy"
                className="mdui-textfield-input">
            </textarea>
        </div>
    )
}

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            res: ''
        }
    }
    componentDidMount() {
        clipboard && clipboard.destroy();
        var clipboard = new ClipboardJS('#becopy');
        clipboard.on('success', e => {
            snackbar({ message: '已复制结果' })
            e.clearSelection()
        })
    }
    render() {
        const { text } = this.state
        return (
            <>
                <DragRead
                    cb={newValue => {
                        this.setState({ text: newValue })
                    }}
                >
                    <Input
                        value={text}
                        onValueChange={newValue => {
                            this.setState({ text: newValue })
                        }}
                        placeholder="输入内容或拖入txt文件"
                        rows="5"
                    />
                </DragRead>
                <center>
                    <button
                        onClick={() => {
                            this.setState({ res: dic.toSimpleChinese(text) })
                        }}
                        className="mdui-color-theme mdui-btn-raised mdui-btn mdui-ripple">
                        转为简体
                    </button>
                    <span style={{ margin: '0px 5px 0px 5px' }}></span>
                    <button
                        onClick={() => {
                            this.setState({ res: dic.toTraditionChinese(text) })
                        }}
                        className="mdui-color-theme mdui-btn-raised mdui-btn mdui-ripple">
                        转为繁体
                    </button>
                </center>
                <br></br>
                <PrintRes
                    res={this.state.res}
                />
            </>
        )
    }
}
