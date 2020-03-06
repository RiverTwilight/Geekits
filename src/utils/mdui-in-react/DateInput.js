import React from 'react'
import PropTypes from 'prop-types'

/**
  *日期选择按钮组件
  **/

/***必须要class组件，因为需要用到Ref***/
class DateInput extends React.Component {
	render(){
		const { DateInput, text, onDateChange } = this.props
		return(
			<React.Fragment>
				<button
					className="mdui-btn mdui-btn-block" 					
					onClick={()=>{
						this.refs.input.click()
					}}
				>
				<i className="mdui-icon-left mdui-icon material-icons">date_range</i>
				{DateInput}
				</button>
				<input 
					style={{display:'block'}}
					value={DateInput} ref="input" type="date"
					onChange={e=>{
						onDateChange(e.target.value)
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