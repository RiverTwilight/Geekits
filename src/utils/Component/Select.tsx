import * as React from 'react'
import * as mdui from 'mdui'
import { SelectProps, SelectState } from './types/development'
/**
  *下拉选择
  **/


export default class Select extends React.Component<SelectProps, SelectState> {
    selectDom: any
    constructor(props: any) {
        super(props);
        this.state = {
            dom:null
        }
    }
    componentDidMount(){
        var inst = new mdui.Drawer(this.selectDom);
        this.setState({dom: inst})
    }
    componentDidUpdate(){
        //保留平滑切换动画
        setTimeout(()=>this.state.dom.handleUpdate(),100)
    }
    render(){
        const {options, value, onOptionChange} = this.props;
        return(
            <select 
                onChange={e=>{
                    onOptionChange(e.target.value)
                }}
                ref={r => this.selectDom = r}
                value={value} className="mdui-select"
            >
                {options.map(a=>(
                    <option key={a.value} value={a.value}>{a.name}</option>
                ))}
            </select>
        )
    }
}
