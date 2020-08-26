import React from 'react'
import { snackbar } from 'mdui'
import ClipboardJS from 'clipboard'
import mimeTypes from './dictionary'
import { Input } from 'mdui-in-react'

//结果展示
function Result(props: any) {
    const { kwd } = props;
    if (kwd === "") return null
    const length = Object.getOwnPropertyNames(mimeTypes).length;
    const type = Object.values(mimeTypes);
    const extension = Object.keys(mimeTypes)
    var res = [];
    for (var i = length - 1; i >= 0; i--) {
        // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
        if (extension[i].indexOf(kwd) !== -1 || type[i].indexOf(kwd) !== -1) {
            //console.log(Object.keys(mimeTypes)[i]); //输出键值（类型）
            res.push({
                type: type[i],
                extension: extension[i]
            })
        }
    }
    return (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className="mdui-table-fluid">
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <table className="mdui-table">
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <tbody>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <tr>
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <th>扩展名</th>
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <th>类型/子类型</th>
                    </tr>
                    {res.map((piece, i) => (
                        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <tr key={i}>
                            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <th>{piece.extension}</th>
                            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <th>{piece.type}</th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

type ComponentState = any;

export default class extends React.Component<{}, ComponentState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            kwd: ''
        }
    }
    compomenetDidMount() {
        var clipboard = new ClipboardJS('tr td:nth-child(2)', {
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'default' is missing the following properties... Remove this comment to see the full error message
            target: () => {
                return this
            }
        })
        clipboard.on('success', e => {
            console.log(e);
            snackbar({
                message: '已复制'
            })
        })
    }
    render() {
        return (
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Input
                    onValueChange={newText => {
                        this.setState({ kwd: newText })
                    }}
                    // @ts-expect-error ts-migrate(2322) FIXME: Property 'autoFocus' does not exist on type 'Intri... Remove this comment to see the full error message
                    autoFocus
                    header="类型/扩展名"
                    placeholder={"从" + Object.getOwnPropertyNames(mimeTypes).length + "条数据中查找"}
                    icon="attachment"
                    value={this.state.kwd}
                />
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Result kwd={this.state.kwd} />
            </>
        )
    }
}
