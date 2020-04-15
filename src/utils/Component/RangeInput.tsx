import * as React from 'react';
import { RangeInput } from './types/development'
/**
  *进度调节Slidebar
  **/

export default ({
	max = "10", min = "1", step = "1", value = "5", title = "调节", onValueChange}: RangeInput) => {
	return(
		<div className="mdui-textfield">
			<label className="mdui-textfield-label">{title}</label>
			<label className="mdui-slider">
				<input 
					onChange={e=>{
						onValueChange && onValueChange(e.target.value)
					}}
					type="range" value={value}
					step={step} min={min}
					max={max}
				/>
			</label>
		</div>
	)
}
