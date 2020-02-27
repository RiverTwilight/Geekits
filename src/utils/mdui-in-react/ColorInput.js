import React from 'react'
import PropTypes from 'prop-types'

/**
  *颜色选择按钮组件
  **/

/***必须要class组件，因为需要用到Ref***/
class Color extends React.Component {
	constructor(props) {
		super(props);	
	}
	render(){
		const { color, text } = this.props
		return(
			<React.Fragment>
				<button
					className="mdui-btn mdui-btn-block" 					
					onClick={()=>{
						this.refs.input.click()
					}}
				>
				<i style={{color:color}} className="mdui-icon-left mdui-icon material-icons">lens</i>
				{text}{color}
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

Color.defaultProps = {
    value: '#000000',
    onColorChange:()=>{},
    text:'选择颜色'
}

Color.propTypes={
    text:PropTypes.string,//文本
    value:PropTypes.string,//颜色值
    onColorChange:PropTypes.func,//回调函数
}

export default Color