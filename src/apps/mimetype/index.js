import React from 'react'
import mdui from 'mdui'
import ClipboardJS from 'clipboard'

import mimeTypes from './dictionary'

import TextInput from '../../utils/mdui-in-react/TextInput'

//结果展示
function Result(props){
    const { kwd } = props;
    if(kwd === "")return null
    const length = Object.getOwnPropertyNames(mimeTypes).length;
    const type = Object.keys(mimeTypes);
    const extension = Object.values(mimeTypes)
    var res = [];
    for (var i = length - 1; i >= 0; i--) {
        if (extension[i].indexOf(kwd) !== -1 || type[i].indexOf(kwd) !== -1) {
            console.log(Object.keys(mimeTypes)[i]); //输出键值（类型）
            res.push({
                type: type[i],
                extension: extension[i]
            })
        }
    } 
    return(
        <div className="mdui-table-fluid">
            <table className="mdui-table">
                <tbody>
                    <tr>
                        <th>扩展名</th>
                        <th>类型/子类型</th>                      
                    </tr>
                    {res.map((piece,i)=>(
                        <tr>
                            <th>{piece.extension}</th>
                            <th>{piece.type}</th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

class Ui extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            kwd:''
        }
    }
    compomenetDidMount(){
        var clipboard = new ClipboardJS('tr td:nth-child(2)',{
            target: () => {
                return this
            }
        })
        clipboard.on('success', e => {
            console.log(e);
            mdui.snackbar({
                message: '已复制'
            })
        })
    }
    render(){
        return(
            <React.Fragment> 
                <TextInput
                    onTextChange={newText=>{
                        this.setState({kwd:newText})
                    }}
                    header="类型/扩展名"
                    placeholder={"从" + Object.getOwnPropertyNames(mimeTypes).length + "条数据中查找"}
                    icon="attachment"
                    value={this.state.kwd}
                />
                <Result kwd={this.state.kwd} />
            </React.Fragment>
        )   
    }
}

export default ()=><Ui />;