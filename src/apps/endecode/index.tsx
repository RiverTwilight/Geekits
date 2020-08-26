import React from 'react'
import { snackbar } from 'mdui'
import ClipboardJS from 'clipboard'
// @ts-expect-error ts-migrate(2305) FIXME: Module '"mdui-in-react"' has no exported member 'S... Remove this comment to see the full error message
import { Input, Select } from 'mdui-in-react'
import dic from './dictionary'
// @ts-expect-error ts-migrate(6142) FIXME: Module '../../utils/Hooks/useFileDrager' was resol... Remove this comment to see the full error message
import { signListener, removeListener } from '../../utils/Hooks/useFileDrager'

//结果展示框
const PrintRes = ({
    res,
    to
}: any) => {
    if (res !== '') {
        var showRes = res[to]
    } else {
        showRes = ''
    }
    return (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className="mdui-card mdui-textfield">
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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

type ComponentState = any;

export default class extends React.Component<{}, ComponentState> {
    constructor(props: {}) {
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
    render() {
        const { text, fromType, toType, key, res } = this.state
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        return <>
            {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'center' does not exist on type 'JSX.Intr... Remove this comment to see the full error message */}
            <center style={{ margin: '0 auto' }}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Select
                    onOptionChange={(val: any) => {
                        this.setState({ fromType: val })
                    }}
                    value={fromType}
                    options={options}
                />
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <button
                    style={{ margin: '0px 5px' }}
                    className="mdui-btn mdui-btn-icon"
                    onClick={() => {
                        this.setState({
                            fromType: toType,
                            toType: fromType
                        })
                    }}>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <i className="mdui-icon material-icons">arrow_forward</i>
                </button>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Select
                    onOptionChange={(val: any) => {
                        this.setState({ toType: val })
                    }}
                    value={toType}
                    options={options}
                />
            {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'center' does not exist on type 'JSX.Intr... Remove this comment to see the full error message */}
            </center>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Input
                onValueChange={newText => {
                    this.setState({ key: newText })
                }}
                value={key}
                placeholder="输入密钥（可选）"
            />
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
                            //console.log(dic(this.state.from,this.state.text,this.state.key))
                            this.setState({ res: dic(fromType, text, key) })
                        }} className="mdui-btn-raised mdui-color-theme mdui-btn mdui-ripple">
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <i className="mdui-icon-left mdui-icon material-icons">translate</i>
                    转换
                </button>
                {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'center' does not exist on type 'JSX.Intr... Remove this comment to see the full error message */}
                </center>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <br></br>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <PrintRes
                    res={res}
                    to={toType}
                />
            </div>
        </>;
    }
}
