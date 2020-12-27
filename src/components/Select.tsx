import * as React from "react";
import * as mdui from "mdui";

type State = any;
/**
 *下拉选择
 **/

// FIXME 切换页面后不消失

export default class Select extends React.Component<any, State> {
	selectDom: any;
	constructor(props: any) {
		super(props);
		this.state = {
			dom: null,
		};
	}
	componentDidMount() {
		// @ts-expect-error ts-migrate(2339) FIXME: Property 'Select' does not exist on type 'IMduiSta... Remove this comment to see the full error message
		var inst = new mdui.Select(this.selectDom, this.props.config);
		this.setState({ dom: inst });
	}
	componentWillUnmount() {
		this.setState({
			dom: null,
		});
	}
	componentDidUpdate() {
		//保留平滑切换动画
		setTimeout(() => {
			this.state.dom && this.state.dom.handleUpdate();
		}, 100);
	}
	render() {
		const { options, value, onOptionChange } = this.props;
		return (
			<select
				onChange={(e) => {
					onOptionChange(e.target.value);
				}}
				ref={(r) => (this.selectDom = r)}
				value={value}
				className="mdui-select"
			>
				{options.map((a: any) => (
					<option key={a.value} value={a.value}>
						{a.name}
					</option>
				))}
			</select>
		);
	}
}
