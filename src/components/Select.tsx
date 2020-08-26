import * as React from 'react'
import * as mdui from 'mdui'

type State = any;
/**
  *下拉选择
  **/

//@ts-nocheck

export default class extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            dom:null
        }
    }
    componentDidMount(){
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'Select' does not exist on type 'IMduiSta... Remove this comment to see the full error message
        var inst = new mdui.Select(this.selectDom, this.props.config);
        this.setState({dom: inst})
    }
    componentDidUpdate(){
        //保留平滑切换动画
        setTimeout(()=>this.state.dom.handleUpdate(),100)
    }
    render(){
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'options' does not exist on type 'Readonl... Remove this comment to see the full error message
        const {options, value, onOptionChange} = this.props;
        return (
            
            <select 
                onChange={e=>{
                    onOptionChange(e.target.value)
                }}
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectDom' does not exist on type 'defau... Remove this comment to see the full error message
                ref={r => this.selectDom = r}
                value={value} className="mdui-select"
            >
                
                {options.map((a: any) => <option key={a.value} value={a.value}>{a.name}</option>)}
            </select>
        );
    }
}
