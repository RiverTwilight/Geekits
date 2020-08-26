import React, { createRef } from 'react'
import { snackbar } from 'mdui'
import ClipboardJS from 'clipboard'
import { Input } from 'mdui-in-react'
// @ts-expect-error ts-migrate(6142) FIXME: Module '../../utils/Hooks/useFileDrager' was resol... Remove this comment to see the full error message
import { signListener, removeListener } from '../../utils/Hooks/useFileDrager'

const PrintRes = ({
    res
}: any) => (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className="mdui-card mdui-col">
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <div style={{ height: '130px' }} className="mdui-typo mdui-dialog-content mdui-p-a-2">
            {res}
        </div>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <a id="becopy" data-clipboard-text={res} className="mdui-float-right mdui-btn mdui-btn-icon">
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <i className="mdui-icon material-icons">&#xe14d;</i>
        </a>
    </div>
)

type ComponentState = any;

export default class extends React.Component<{}, ComponentState> {
    constructor(props: {}) {
        super(props);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'dropBox' does not exist on type 'default... Remove this comment to see the full error message
        this.dropBox = createRef()
        this.state = {
            text: '<span style="color: #66ccff"></span>',
            res: ''
        }
    }
    componentDidMount() {
        // @ts-expect-error ts-migrate(2454) FIXME: Variable 'clipboard' is used before being assigned... Remove this comment to see the full error message
        clipboard && clipboard.destroy();
        var clipboard = new ClipboardJS('#becopy');
        clipboard.on('success', e => {
            snackbar({ message: '已复制结果' })
            e.clearSelection();
        })
        signListener((text: any) => {
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
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        var inlineStyle = /\bstyle="(.+)"/.exec(String(text))[1]
        var dom = document.createElement('div');
        dom.innerHTML = `<div style="${inlineStyle}"></div>`;
        var styleObj = dom.getElementsByTagName('div')[0].style;
        var jsxStyle = {}
        var usefulStyle = Object.keys(styleObj).map(style => {
            // @ts-expect-error ts-migrate(7015) FIXME: Element implicitly has an 'any' type because index... Remove this comment to see the full error message
            let content = styleObj[style]
            if (content !== '' && content !== undefined) return style
        }).filter(style => style);
        // @ts-expect-error ts-migrate(2538) FIXME: Type 'undefined' cannot be used as an index type.
        usefulStyle.slice(usefulStyle.length / 2, usefulStyle.length).map(style => jsxStyle[style] = styleObj[style])
        var res = text
            .replace(/\b([a-z]+)-([a-z]+)\b/g, (word: any, sub1: any, sub2: any) => (
                sub1 + sub2.substring(0, 1).toUpperCase() + sub2.substring(1)
            )
            )
            .replace(/\bclass[\=]/g, 'className=')
            .replace(/\bstyle="(.+)"/g, `style={${JSON.stringify(jsxStyle)}}`)
            .replace(/\bautofocus\b/g, 'autoFocus')
            .replace(/\bcontenteditable\b/g, 'contentEditAble')
            .replace(/\bcontextmenu\b/g, 'contextMenu')
            .replace(/\bon(.+)="/g, (word: any, sub1: any) => (
                `on${sub1.substring(0, 1).toUpperCase() + sub1.substring(1)}="`
            ))
        this.setState({
            res: res
        })
    }
    render() {
        const { text, res } = this.state
        return (
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div className="mdui-row-md-2">
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Input
                        value={text}
                        onValueChange={newValue => {
                            this.setState({ text: newValue })
                        }}
                        placeholder="输入内容或拖入txt文件"
                        // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number | ... Remove this comment to see the full error message
                        rows="5"
                    />
                    {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'center' does not exist on type 'JSX.Intr... Remove this comment to see the full error message */}
                    <center>
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <button
                            onClick={() => {
                                this.html2jsx()
                            }} className="mdui-btn-raised mdui-color-theme mdui-btn mdui-ripple">
                            转换为jsx
                        </button>
                    {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'center' does not exist on type 'JSX.Intr... Remove this comment to see the full error message */}
                    </center>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <br></br>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <PrintRes
                        res={res}
                    />
                </div>
            </>
        )
    }
}
