import React from 'react';

/**
  *颜色选择按钮组件
  *@param {string} value 默认值
  *@param {string} text 按钮文字，默认为“选择颜色”
  *@param {function} onColorChange 内容变化时的回调函数，返回新的值
  **/

/***必须要es6组件，因为需要用到Ref***/
class Color extends React.Component {
	constructor(props) {
		super(props);	
	}
	render(){
		const { color } = this.props
		return(
			<React.Fragment>
				<button
					className="mdui-btn mdui-btn-block" 					
					onClick={()=>{
						this.refs.input.click()
					}}
				>
				<i style={{color:color}} class="mdui-icon-left mdui-icon material-icons">lens</i>
				{this.props.text || '选择颜色'}{color}
				</button>
				<input 
					style={{display:'none'}}
					value={color} ref="input" type="color"
					onChange={e=>{
						this.props.onColorChange(e.target.value)
					}}
				></input>
			</React.Fragment>
		)
	}
}
export default Color