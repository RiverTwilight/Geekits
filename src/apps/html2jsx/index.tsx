import React, { createRef } from "react";
import { snackbar } from "mdui";
import ClipboardJS from "clipboard";
import { Input, Button } from "mdui-in-react";
import { signListener, removeListener } from "../../utils/Hooks/useFileDrager";

const PrintRes = ({ res }: any) => (
	<div className="mdui-card mdui-col">
		<div
			style={{ height: "130px" }}
			className="mdui-typo mdui-dialog-content mdui-p-a-2"
		>
			{res}
		</div>

		<a
			id="becopy"
			data-clipboard-text={res}
			className="mdui-float-right mdui-btn mdui-btn-icon"
		>
			<i className="mdui-icon material-icons">&#xe14d;</i>
		</a>
	</div>
);

type ComponentState = any;

export default class extends React.Component<{}, ComponentState> {
	constructor(props: {}) {
		super(props);
		// @ts-expect-error ts-migrate(2339) FIXME: Property 'dropBox' does not exist on type 'default... Remove this comment to see the full error message
		this.dropBox = createRef();
		this.state = {
			text: '<span style="color: #66ccff"></span>',
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
	html2jsx() {
		// TODO 短横线转小驼峰
		const { text } = this.state;
		// @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
		var inlineStyle = /\bstyle="(.+)"/.exec(String(text))[1];
		var dom = document.createElement("div");
		dom.innerHTML = `<div style="${inlineStyle}"></div>`;
		var styleObj = dom.getElementsByTagName("div")[0].style;
		var jsxStyle = {};
		var usefulStyle = Object.keys(styleObj)
			.map((style) => {
				// @ts-expect-error ts-migrate(7015) FIXME: Element implicitly has an 'any' type because index... Remove this comment to see the full error message
				let content = styleObj[style];
				if (content !== "" && content !== undefined) return style;
			})
			.filter((style) => style);
		usefulStyle
			.slice(usefulStyle.length / 2, usefulStyle.length)
			// @ts-expect-error ts-migrate(7015) FIXME: Element implicitly has an 'any' type because index... Remove this comment to see the full error message
			.map((style) => (jsxStyle[style] = styleObj[style]));
		var res = text
			.replace(
				/\b([a-z]+)-([a-z]+)\b/g,
				(word: any, sub1: any, sub2: any) =>
					sub1 +
					sub2.substring(0, 1).toUpperCase() +
					sub2.substring(1)
			)
			.replace(/\bclass[\=]/g, "className=")
			.replace(/\bstyle="(.+)"/g, `style={${JSON.stringify(jsxStyle)}}`)
			.replace(/\bautofocus\b/g, "autoFocus")
			.replace(/\bcontenteditable\b/g, "contentEditAble")
			.replace(/\bcontextmenu\b/g, "contextMenu")
			.replace(
				/\bon(.+)="/g,
				(word: any, sub1: any) =>
					`on${
						sub1.substring(0, 1).toUpperCase() + sub1.substring(1)
					}="`
			);
		this.setState({
			res: res,
		});
	}
	render() {
		const { text, res } = this.state;
		return (
			<>
				<div className="mdui-row-md-2">
					<Input
						value={text}
						onValueChange={(newValue) => {
							this.setState({ text: newValue });
						}}
						placeholder="输入内容或拖入txt文件"
						rows={5}
					/>
					{/* @ts-expect-error ts-migrate(2339) FIXME: Property 'center' does not exist on type 'JSX.Intr... Remove this comment to see the full error message */}
					<center>
						<Button
							onClick={this.html2jsx.bind(this)}
							title="转换为jsx"
							raised
							primary
						/>
						{/* @ts-expect-error ts-migrate(2339) FIXME: Property 'center' does not exist on type 'JSX.Intr... Remove this comment to see the full error message */}
					</center>

					<br></br>

					<PrintRes res={res} />
				</div>
			</>
		);
	}
}
