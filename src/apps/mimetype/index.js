import React from 'react'
import mdui from 'mdui'
import ClipboardJS from 'clipboard'

import mimeTypes from './dictionary'

import TextInput from '../../utils/mdui-in-react/TextInput'

/**
  *2020-2-9 耗时约40分钟 江村暮
  */

//结果展示
function Result(props){
    const { kwd } = props;
    const length = Object.getOwnPropertyNames(mimeTypes).length;
    if(kwd == ''){
        /*var res = []
        Object.keys(mimeTypes).forEach(key=>{
            res.push(
                <tr>
                    <td>{key}</td>
                    <td>{mimeTypes[key]}</td>
                </tr>
            )           
        })*/
        var res = null
    }else{
        if (mimeTypes[kwd] !== undefined) { //如果找到了对应扩展名，说明输入子类型
            var res = (
            <tr>
                <td>{kwd}</td>
                <td>{mimeTypes[kwd]}</td>
            </tr>)
        } else {
            for (var i = Object.getOwnPropertyNames(mimeTypes).length - 1; i >= 0; i--) {
                if (kwd == Object.values(mimeTypes)[i]) { //如果输入的值等于扩展名
                    console.log(Object.keys(mimeTypes)[i]); //输出键值（类型）
                    var res = (
                        <tr>
                            <td>{Object.keys(mimeTypes)[i]}</td>
                            <td>{kwd}</td>
                        </tr>
                    )
                }
            }
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
                    {res}
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
                    type="text"
                    value={this.state.kwd}
                />
                <Result kwd={this.state.kwd} />
            </React.Fragment>
        )   
    }
}

export default ()=><Ui />;