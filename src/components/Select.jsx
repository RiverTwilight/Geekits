import * as React from 'react'
import * as mdui from 'mdui'
/**
  *下拉选择
  **/

//@ts-nocheck

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dom:null
        }
    }
    componentDidMount(){
        var inst = new mdui.Select(this.selectDom, this.props.config);
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
