import React, { createRef } from 'react'
import { snackbar } from 'mdui'
import ClipboardJS from 'clipboard'
import { Input } from 'mdui-in-react'
import { signListener, removeListener } from '../../utils/Hooks/useFileDrager'

const PrintRes = ({ res }) => (
    <div className="mdui-card mdui-col">
        <div style={{ height: '130px' }} className="mdui-typo mdui-dialog-content mdui-p-a-2">
            {res}
        </div>
        <a id="becopy" data-clipboard-text={res} className="mdui-float-right mdui-btn mdui-btn-icon">
            <i className="mdui-icon material-icons">&#xe14d;</i>
        </a>
    </div>
)

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.dropBox = createRef()
        this.state = {
            text: '<span style="color: #66ccff"></span>',
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
    html2jsx() {
        const { text } = this.state;
        var inlineStyle = /\bstyle="(.+)"/.exec(String(text))[1]
        var dom = document.createElement('div');
        dom.innerHTML = `<div style="${inlineStyle}"></div>`;
        var styleObj = dom.getElementsByTagName('div')[0].style;
        var jsxStyle = {}
        var usefulStyle = Object.keys(styleObj).map(style => {
            let content = styleObj[style]
            if (content !== '' && content !== undefined) return style
        }).filter(style => style);
        usefulStyle.slice(usefulStyle.length / 2, usefulStyle.length).map(style => jsxStyle[style] = styleObj[style])
        var res = text
            .replace(/\b([a-z]+)-([a-z]+)\b/g, (word, sub1, sub2) => (
                sub1 + sub2.substring(0, 1).toUpperCase() + sub2.substring(1)
            )
            )
            .replace(/\bclass[\=]/g, 'className=')
            .replace(/\bstyle="(.+)"/g, `style={${JSON.stringify(jsxStyle)}}`)
            .replace(/\bautofocus\b/g, 'autoFocus')
            .replace(/\bcontenteditable\b/g, 'contentEditAble')
            .replace(/\bcontextmenu\b/g, 'contextMenu')
            .replace(/\bon(.+)="/g, (word, sub1) => (
                `on${sub1.substring(0, 1).toUpperCase() + sub1.substring(1)}="`
            ))
        this.setState({
            res: res
        })
    }
    render() {
        const { text, res } = this.state
        return (
            <>
                <div className="mdui-row-md-2">
                    <Input
                        value={text}
                        onValueChange={newValue => {
                            this.setState({ text: newValue })
                        }}
                        placeholder="输入内容或拖入txt文件"
                        rows="5"
                    />
                    <center>
                        <button
                            onClick={() => {
                                this.html2jsx()
                            }} className="mdui-btn-raised mdui-color-theme mdui-btn mdui-ripple">
                            转换为jsx
                        </button>
                    </center>
                    <br></br>
                    <PrintRes
                        res={res}
                    />
                </div>
            </>
        )
    }
}
