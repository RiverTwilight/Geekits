import React from "react";
import { snackbar } from "mdui";
import ClipboardJS from "clipboard";
import { Input, Select, Button } from "mdui-in-react";
import dic from "./dictionary";
import { signListener, removeListener } from "../../utils/Hooks/useFileDrager";

//结果展示框
const PrintRes = ({ res, to }: any) => {
	if (res !== "") {
		var showRes = res[to];
	} else {
		showRes = "";
	}
	return (
		<div className="mdui-card mdui-textfield">
			<div
				data-clipboard-text={String(showRes)}
				style={{ height: "130px" }}
				id="becopy"
				className="mdui-typo mdui-dialog-content mdui-p-a-2"
			>
				{String(showRes)}
			</div>
		</div>
	);
};

const options = [
	{
		name: "正常文本",
		value: "text",
	},
	{
		name: "RC4",
		value: "rc4",
	},
	{
		name: "摩斯电码",
		value: "moss",
	},
	{
		name: "MD5",
		value: "md5",
	},
	{
		name: "URL",
		value: "url",
	},
	{
		name: "URLcomponent",
		value: "URLcomponent",
	},
	{
		name: "base64",
		value: "base64",
	},
];

class Endecode extends React.Component<{}, any> {
	constructor(props: {}) {
		super(props);
		this.state = {
			fromType: "text",
			toType: "md5",
			text: "",
			key: "",
			res: "",
		};
	}
	componentDidMount() {
		var clipboard = new ClipboardJS("#becopy");
		clipboard.on("success", (e) => {
			snackbar({ message: "已复制结果" });
			e.clearSelection();
		});
		signListener((text: any) => {
			this.setState({
				text: text,
			});
		});
	}
	componentWillUnmount() {
		removeListener();
	}
	render() {
		const { text, fromType, toType, key, res } = this.state;
		return (
			<>
				<div className="center-with-flex">
					<Select
						onOptionChange={(val: any) => {
							this.setState({ fromType: val });
						}}
						value={fromType}
						options={options}
					/>
					<button
						style={{ margin: "0px 5px" }}
						className="mdui-btn mdui-btn-icon"
						onClick={() => {
							this.setState({
								fromType: toType,
								toType: fromType,
							});
						}}
					>
						<i className="mdui-icon material-icons">
							arrow_forward
						</i>
					</button>
					<Select
						onOptionChange={(val: any) => {
							this.setState({ toType: val });
						}}
						value={toType}
						options={options}
					/>
				</div>
				<Input
					onValueChange={(newText) => {
						this.setState({ key: newText });
					}}
					value={key}
					placeholder="输入密钥（可选）"
				/>
				<div className="mdui-row-md-2">
					<Input
						value={text}
						onValueChange={(newValue) => {
							this.setState({ text: newValue });
						}}
						placeholder="输入内容或拖入txt文件"
						rows={5}
					/>
					<div className="center-with-flex">
						<Button
							onClick={() => {
								this.setState({
									res: dic(fromType, text, key),
								});
							}}
							icon="translate"
							title="转换"
							raised
							primary
						/>
					</div>
					<br></br>
					<PrintRes res={res} to={toType} />
				</div>
			</>
		);
	}
}

export default Endecode;
