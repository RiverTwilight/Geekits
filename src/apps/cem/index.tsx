import React from "react";
import mdui from "mdui";
import ClipboardJS from "clipboard";
import table from "./table";
import { Input, Button } from "mdui-in-react";
import cem from "./dic";

// TODO 离子方程式配平

const Result = ({ result, eleClass }: any) => {
	if (result === "") return null;
	const pt = JSON.parse(table);
	var info: any = [];
	pt.map((stance: any) => {
		eleClass.map((ele: any) => {
			if (ele.ele === stance.symbol) info.push(stance);
		});
	});
	return (
		<>
			<div className="mdui-typo mdui-text-center">
				<h3 dangerouslySetInnerHTML={{ __html: result }}></h3>
			</div>
			<div className="mdui-table-fluid">
				<table className="mdui-table">
					<thead>
						<tr>
							<th>原子序数</th>
							<th>元素名</th>
							<th>相对原子质量</th>
						</tr>
					</thead>
					<tbody>
						{
							// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'stance' implicitly has an 'any' type.
							info.map((stance, i) => (
								<tr key={i}>
									<td>{stance.atomicNumber}</td>

									<td>{stance.symbol}</td>

									<td>{stance.atomicMass}</td>
								</tr>
							))
						}
					</tbody>
				</table>
			</div>
		</>
	);
};

type UiState = any;

export default class Cem extends React.Component<{}, UiState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			input: "Cu + HNO3 = Cu(NO3)2 + NO2 + H2O",
			result: "",
			eleClass: [],
		};
	}
	componentDidMount() {
		var clipboard = new ClipboardJS("#input");
		clipboard.on("success", (e) => {
			mdui.snackbar({ message: "已复制链接" });
			e.clearSelection();
		});
	}
	render() {
		return (
			<>
				<Input
					onValueChange={(newText) => {
						this.setState({ input: newText });
					}}
					pattern="\S+\=\S+"
					header="输入方程式"
					icon="link"
					value={this.state.input}
					rows={3}
				/>
				<Button
					onClick={() => {
						var library = cem(this.state.input);
						this.setState({
							result: library.result,
							eleClass: library.eleClass,
						});
					}}
					raised
					primary
					title="配平"
				/>
				<div className="mdui-clearfix"></div>
				<Result
					eleClass={this.state.eleClass}
					result={this.state.result}
				/>
			</>
		);
	}
}
