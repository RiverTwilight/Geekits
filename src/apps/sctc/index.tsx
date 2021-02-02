import React from 'react'
import { snackbar } from 'mdui'
import dic from './dictionary'
import { Input } from 'mdui-in-react'
import ClipboardJS from 'clipboard'
import { signListener, removeListener } from '../../utils/Hooks/useFileDrager'

//结果展示框
function PrintRes(props: any) {
    return (
        <div className="mdui-col mdui-textfield">
            <textarea
                value={props.res}
                data-clipboard-text={String(props.res)}
                rows={5} id="becopy"
                className="mdui-textfield-input">
            </textarea>
        </div>
    )
}

type ComponentState = any;

export default class extends React.Component<{}, ComponentState> {
    constructor(props: {}) {
        super(props);
        this.state = {
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
            e.clearSelection()
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
        const { text } = this.state
        return (
            
            <>
                
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
                <div className="center-with-flex">
                    
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
                {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'center' does not exist on type 'JSX.Intr... Remove this comment to see the full error message */}
                </div>
                
                <br></br>
                
                <PrintRes
                    res={this.state.res}
                />
            </>
        )
    }
}
