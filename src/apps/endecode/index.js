import React from 'react'
import { snackbar } from 'mdui'
import ClipboardJS from 'clipboard'
import Select from '../../components/Select'
import Input from '../../components/Input.tsx'
import DragRead from '../../utils/DragReadContainer'
import dic from './dictionary'
import { signListener, removeListener } from '../../utils/Hooks/useFileDrager'

//结果展示框
const PrintRes = ({ res, to }) => {
    if (res !== '') {
        var showRes = res[to]
    } else {
        showRes = ''
    }
    return (
        <div className="mdui-card mdui-textfield">
            <div data-clipboard-text={String(showRes)} style={{ height: '130px' }} id="becopy" className="mdui-typo mdui-dialog-content mdui-p-a-2">
                {String(showRes)}
            </div>
        </div>
    )
}

const options = [{
    name: '正常文本',
    value: 'text'
}, {
    name: 'RC4',
    value: 'rc4'
}, {
    name: '摩斯电码',
    value: 'moss'
}, {
    name: 'MD5',
    value: 'md5'
}, {
    name: 'URL',
    value: 'url'
}, {
    name: 'URLcomponent',
    value: 'URLcomponent'
}, {
    name: 'base64',
    value: 'base64'
}]

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fromType: 'text',
            toType: 'md5',
            text: '',
            key: '',
            res: ''
        }
    }
    componentDidMount() {
        clipboard && clipboard.destroy();
        var clipboard = new ClipboardJS('#becopy');
        clipboard.on('success', e => {
            snackbar({ message: '已复制结果' })
            e.clearSelection();
        })
        signListener(text => {
            this.setState({
                text: text
            })
        })
    }
    componentWillUnmount() {
        removeListener()
    }
    render() {
        const { text, fromType, toType, key, res } = this.state
        return (
            <>
                <center style={{ margin: '0 auto' }}>
                    <Select
                        onOptionChange={val => {
                            this.setState({ fromType: val })
                        }}
                        value={fromType}
                        options={options}
                    />
                    <button
                        style={{ margin: '0px 5px' }}
                        className="mdui-btn mdui-btn-icon"
                        onClick={() => {
                            this.setState({
                                fromType: toType,
                                toType: fromType
                            })
                        }}>
                        <i className="mdui-icon material-icons">arrow_forward</i>
                    </button>
                    <Select
                        onOptionChange={val => {
                            this.setState({ toType: val })
                        }}
                        value={toType}
                        options={options}
                    />
                </center>
                <Input
                    onValueChange={newText => {
                        this.setState({ key: newText })
                    }}
                    value={key}
                    placeholder="输入密钥（可选）"
                />
                <div className="mdui-row-md-2">
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
                                //console.log(dic(this.state.from,this.state.text,this.state.key))
                                this.setState({ res: dic(fromType, text, key) })
                            }} className="mdui-btn-raised mdui-color-theme mdui-btn mdui-ripple">
                            <i className="mdui-icon-left mdui-icon material-icons">translate</i>
                        转换
                    </button>
                    </center>
                    <br></br>
                    <PrintRes
                        res={res}
                        to={toType}
                    />
                </div>
            </>
        )
    }
}
