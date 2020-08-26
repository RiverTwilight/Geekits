import React from 'react'
import mdui from 'mdui'
import ClipboardJS from 'clipboard'

import table from './table'
import { Input } from 'mdui-in-react'
import cem from './dic.js'

const Result = ({
    result,
    eleClass
}: any) =>{
    if(result === "")return null;
    const pt = JSON.parse(table);
    var info: any = [];
    pt.map((stance: any) => {
        eleClass.map((ele: any) => {
            if(ele.ele === stance.symbol)info.push(stance)
        })
    })
    return(
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <>  
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div className="mdui-typo mdui-text-center">     
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <h3 dangerouslySetInnerHTML={{__html : result}}></h3>
            </div>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div className="mdui-table-fluid">
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <table className="mdui-table">
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <thead>
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <tr>
                            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <th>原子序数</th>
                            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <th>元素名</th>
                            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <th>相对原子质量</th>
                        </tr>
                    </thead>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <tbody>{
                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'stance' implicitly has an 'any' type.
                        info.map((stance,i)=>(
                        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <tr key={i}>
                            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <td>{stance.atomicNumber}</td>
                            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <td>{stance.symbol}</td>
                            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <td>{stance.atomicMass}</td>
                        </tr>))
                    }</tbody>
                  </table>
            </div>
        </>
    )
}

type UiState = any;

class Ui extends React.Component<{}, UiState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            input:"Cu + HNO3 = Cu(NO3)2 + NO2 + H2O",
            result:"",
            eleClass:[]
        }
    }
    componentDidMount(){
        // @ts-expect-error ts-migrate(2454) FIXME: Variable 'clipboard' is used before being assigned... Remove this comment to see the full error message
        clipboard && clipboard.destroy();
        var clipboard = new ClipboardJS('#input');
        clipboard.on('success', e=> {
            mdui.snackbar({message:'已复制链接'});
            e.clearSelection()
        })
    }
    render(){
        return (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        	<>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Input
                    onValueChange={newText=>{
                        this.setState({input:newText})
                    }}
                    pattern="\S+\=\S+"
                    header="输入方程式"
                    icon="link"
                    value={this.state.input}
                    // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number | ... Remove this comment to see the full error message
                    rows="3"
                />         
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <button 
                    onClick={()=>{
                        var library = cem(this.state.input)
                        this.setState({
                            result:library.result,
                            eleClass:library.eleClass
                        })
                    }} 
                    className="mdui-ripple mdui-color-theme mdui-btn-raised mdui-btn">
                    配平
                </button>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div className="mdui-clearfix"></div>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Result
                    eleClass={this.state.eleClass}
                    result={this.state.result}
                />
            </>
        )
    }
}

export default Ui
