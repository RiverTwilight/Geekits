import React from 'react'
import PropTypes from 'prop-types'

/**
  *日期选择按钮组件
  **/

/***必须要class组件，因为需要用到Ref***/
class DateInput extends React.Component {
	render(){
		const { DateInput, text } = this.props
		return(
			<React.Fragment>
				<button
					className="mdui-btn mdui-btn-block" 					
					onClick={()=>{
						this.refs.input.click()
					}}
				>
				<i className="mdui-icon-left mdui-icon material-icons">lens</i>
				{DateInput}
				</button>
				<input 
					style={{display:'none'}}
					value={DateInput} ref="input" type="DateInput"
					onChange={e=>{
						this.props.onDateInputChange(e.target.value)
					}}
				></input>
			</React.Fragment>
		)
	}
}

DateInput.defaultProps = {
    value: '#000000',
    onDateInputChange:()=>{},
    text:'选择颜色'
}

DateInput.propTypes={
    text:PropTypes.string,//文本
    value:PropTypes.string,//颜色值
    onDateInputChange:PropTypes.func,//回调函数
}

export default DateInput