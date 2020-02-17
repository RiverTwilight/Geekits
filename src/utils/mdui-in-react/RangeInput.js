import React from 'react';

/**
  * 间续滑块组件
  *@param {string} step 步长
  *@param {string} title 标题文字
  *@param {function} onValueChange 内容变化时的回调函数，返回新的值
  *@param {string} max 最大值
  *@param {string} min 最小值

  **/

class RangeInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value:this.props.default || '5'
        }       
    }
    render(){
        const { value } = this.state
        return(
            <div className="mdui-textfield">
                <label className="mdui-textfield-label">{this.props.title || '滑块'}</label>
                <label className="mdui-slider">
                    <input 
                        onChange={e=>{
                            this.setState({value:e.target.value})
                            this.props.onValueChange(e.target.value)
                        }}
                        type="range" value={value}
                        step={this.props.step || 1}
                        min={this.props.min || 1}
                        max={this.props.max || 10}/>
                </label>
            </div>
        )
    }
}

export default RangeInput