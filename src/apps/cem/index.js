import React from 'react'
import mdui from 'mdui'
import ClipboardJS from 'clipboard'

import table from './table'
import TextInput from '../../utils/mdui-in-react/TextInput'
import cem from './dic.js'

const Result = props =>{
    const { result, eleClass } = props;
    if(result === "")return null;
    const pt = JSON.parse(table);
    console.log(pt);
    var info = [];
    pt.map(stance=>{
        eleClass.map(ele=>{
            if(ele.ele === stance.symbol)info.push(stance)
        })
    })
    return(
        <React.Fragment>  
            <div className="mdui-typo mdui-text-center">     
                <h3 dangerouslySetInnerHTML={{__html : result}}></h3>
            </div>
            <div class="mdui-table-fluid">
                <table class="mdui-table">
                    <thead>
                        <tr>
                            <th>原子序数</th>
                            <th>元素名</th>
                            <th>相对原子质量</th>
                        </tr>
                    </thead>
                    <tbody>{
                        info.map((stance,i)=>(
                        <tr key={i}>
                            <td>{stance.atomicNumber}</td>
                            <td>{stance.symbol}</td>
                            <td>{stance.atomicMass}</td>
                        </tr>))
                    }</tbody>
                  </table>
                </div>
        </React.Fragment>
    )
}

class Ui extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input:"Cu + H(NO3) = Cu(NO3)2 + NO2 + H2O",
            result:"",
            eleClass:[]
        }
    }
    componentWillMount(){
        clipboard && clipboard.destroy();
        var clipboard = new ClipboardJS('#input');
        clipboard.on('success', e=> {
          mdui.snackbar({message:'已复制链接'})
          e.clearSelection();
        })
    }
    render(){
        return (
        	<React.Fragment>
                <TextInput
                    onTextChange={newText=>{
                        this.setState({input:newText})
                    }}
                    header="输入方程式"
                    icon="link"
                    type="text"
                    value={this.state.input}
                    rows="3"
                />         
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
            <div className="mdui-clearfix"></div>
            <Result
                eleClass={this.state.eleClass}
                result={this.state.result}
            />
            </React.Fragment>
        )
    }
}

export default ()=><Ui />;