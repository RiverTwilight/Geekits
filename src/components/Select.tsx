import * as React from "react";

type State = any;
/**
 *下拉选择
 **/

export default class Select extends React.Component<any, State> {
	selectDom: any;
	render() {
		const { options, value, onOptionChange } = this.props;
		return (
			<div>
				<select
					onChange={(e) => {
						onOptionChange(e.target.value);
					}}
					value={value}
					className="mdui-select"
					mdui-select="true"
				>
					{options.map((a: any) => (
						<option key={a.value} value={a.value}>
							{a.name}
						</option>
					))}
				</select>
			</div>
		);
	}
}
