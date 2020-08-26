import React from 'react'
import { snackbar } from 'mdui'
import ClipboardJS from 'clipboard'
// @ts-expect-error ts-migrate(2305) FIXME: Module '"mdui-in-react"' has no exported member 'S... Remove this comment to see the full error message
import { Input, Select } from 'mdui-in-react'
import axios from '../../utils/axios'
// @ts-expect-error ts-migrate(6142) FIXME: Module '../../utils/Hooks/useFileDrager' was resol... Remove this comment to see the full error message
import { signListener, removeListener } from '../../utils/Hooks/useFileDrager'

const options = [{
    name: '自动',
    value: 'auto',
}, {
    name: '英语',
    value: 'en',
}, {
    name: '中文',
    value: 'zh',
}, {
    name: '日语',
    value: 'jp',
}, {
    name: '文言文',
    value: 'wyw',
}, {
    name: '韩语',
    value: 'kor',
}, {
    name: '粤语',
    value: 'yue',
}, {
    name: '法语',
    value: 'fra',
}, {
    name: '西班牙语',
    value: 'spa'
}, {
    name: '泰语',
    value: 'th'
}, {
    name: '意大利语',
    value: 'it'
}]

const PrintRes = ({
    res
}: any) => {
    return (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className="mdui-card">
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
}

type ComponentState = any;

export default class extends React.Component<{}, ComponentState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            fromLang: 'auto',
            toLang: 'zh',
            text: '',
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
    sendRequest() {
        const { text, fromLang, toLang } = this.state
        window.loadShow();
        axios.post('/api/translate', {
            text: text,
            from: fromLang,
            to: toLang
        }).then(response => {
            var json = JSON.parse(response.request.response);
            this.setState({ res: json.trans_result[0].dst })
        }).catch(error => {
            snackbar({ message: error })
        }).then(() => {
            window.loadHide()
        })
    }
    render() {
        const { text, fromLang, toLang, res } = this.state
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        return <>
            {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'center' does not exist on type 'JSX.Intr... Remove this comment to see the full error message */}
            <center style={{ margin: '0 auto' }}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Select
                    onOptionChange={(val: any) => {
                        this.setState({ fromLang: val })
                    }}
                    value={fromLang}
                    options={options}
                />
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <button
                    style={{ margin: '0px 30px 0px 30px' }}
                    className="mdui-btn mdui-btn-icon"
                    onClick={() => {
                        this.setState({
                            fromLang: toLang,
                            toLang: fromLang
                        })
                    }}>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <i className="mdui-icon material-icons">arrow_forward</i>
                </button>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Select
                    onOptionChange={(val: any) => {
                        this.setState({ toLang: val })
                    }}
                    value={toLang}
                    options={options}
                />
            {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'center' does not exist on type 'JSX.Intr... Remove this comment to see the full error message */}
            </center>
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
                        text !== '' && this.sendRequest()
                    }} className="mdui-btn-raised mdui-color-theme mdui-btn mdui-ripple">
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <i className="mdui-icon-left mdui-icon material-icons">translate</i>
                    翻译
                </button>
            {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'center' does not exist on type 'JSX.Intr... Remove this comment to see the full error message */}
            </center>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <br></br>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <PrintRes
                res={res}
            />
        </>;
    }
}
