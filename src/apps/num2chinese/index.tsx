import React from 'react'
import { snackbar } from 'mdui'
import ClipboardJS from 'clipboard'
import num2chinese from './engine'
import { Input } from 'mdui-in-react'

type State = any;

export default class extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            input: '',
            res: ''
        }
    }
    componentDidMount() {
        // @ts-expect-error ts-migrate(2454) FIXME: Variable 'clipboard' is used before being assigned... Remove this comment to see the full error message
        clipboard && clipboard.destroy();
        var clipboard = new ClipboardJS('#becopy');
        clipboard.on('success', e => {
            snackbar({ message: '已复制' })
            e.clearSelection();
        })
    }
    render() {
        const { input, res } = this.state
        return (
            
            <>
                
                <Input
                    onValueChange={newText => {
                        var cal = new num2chinese(newText);
                        var result = (newText === '') ? '' : cal.calDirect()
                        this.setState({
                            input: newText,
                            res: result
                        })
                    }}
                    autoFocus
                    header="输入小写数字"
                    icon="attach_money"
                    type="number"
                    value={input}
                />
                
                <p
                    style={{ display: (res === '') ? 'none' : 'block' }}
                    id="becopy" data-clipboard-text={res}
                    className="mdui-text-center mdui-typo-title">
                    {res}
                    
                    <button className="mdui-btn-icon mdui-btn"><i className="mdui-icon material-icons">&#xe14d;</i></button>
                </p>
            </>
        )
    }
}
