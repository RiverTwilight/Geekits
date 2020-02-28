import React from 'react';
import PropTypes from 'prop-types'

const RangeInput = ({max, min, step, value, title, onValueChange}) => {
	return(
		<div className="mdui-textfield">
			<label className="mdui-textfield-label">{title}</label>
			<label className="mdui-slider">
				<input 
					onChange={e=>{
						onValueChange(e.target.value)
					}}
					type="range" value={value}
					step={step} min={min}
					max={max}
				/>
			</label>
		</div>
	)
}

RangeInput.defaultProps = {
    max:10,
    min:1,
    step:1,
    title:'滑块'
}

RangeInput.propTypes={
    max:PropTypes.number,
    min:PropTypes.number,
    step:PropTypes.number,
    value:PropTypes.number,
    onValueChange:PropTypes.func,
    title:PropTypes.string,
}

export default RangeInput