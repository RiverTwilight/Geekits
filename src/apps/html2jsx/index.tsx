import React from "react";
import ClipboardJS from "clipboard";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import OutlinedCard from "../../components/OutlinedCard";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {
	signListener,
	removeListener,
} from "../../components/FilePicker/useDragListener";

/**
 * @author RiverTwilight
 * TODO 中文乱码
 */

const Result = ({ res }: any) => {
	if (res === "") return null;
	return (
		<>
			<OutlinedCard>
				<code>{res}</code>
			</OutlinedCard>
		</>
	);
};

type ComponentState = any;

export default class Html2Jsx extends React.Component<{}, ComponentState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			text: '<span onclick="go()" style="color: #66ccff"></span>',
			res: "",
		};
	}
	componentDidMount() {
		var clipboard = new ClipboardJS("#becopy");
		clipboard.on("success", (e) => {
			window.snackbar({ message: "已复制结果" });
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
		const { text } = this.state;
		try {
			var inlineStyle = /\bstyle="(.+)"/.exec(String(text))[1];
			var dom = document.createElement("div");
			dom.innerHTML = `<div style="${inlineStyle}"></div>`;
			var styleObj = dom.getElementsByTagName("div")[0].style;
			var jsxStyle = {};
			var usefulStyle = Object.keys(styleObj)
				.map((style) => {
					let content = styleObj[style];
					if (content !== "" && content !== undefined) return style;
				})
				.filter((style) => style);
			usefulStyle
				.slice(usefulStyle.length / 2, usefulStyle.length)
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
				.replace(
					/\bstyle="(.+)"/g,
					`style={${JSON.stringify(jsxStyle)}}`
				)
				.replace(/\bautofocus\b/g, "autoFocus")
				.replace(/\bcontenteditable\b/g, "contentEditAble")
				.replace(/\bcontextmenu\b/g, "contextMenu")
				.replace(
					/\bon(.+)="/g,
					(word: any, sub1: any) =>
						`on${
							sub1.substring(0, 1).toUpperCase() +
							sub1.substring(1)
						}="`
				);
			this.setState({
				res: res,
			});
		} catch (err) {
			window.snackbar({ message: "转换出错" });
		}
	}
	handleChange = (e: { target: { value: any } }) => {
		const {
			target: { value },
		} = e;

		this.setState({ text: value });
	};
	render() {
		const { text, res } = this.state;
		return (
			<>
				<Grid container spacing={2}>
					<Grid item md={6} xs={12}>
						<FormControl fullWidth>
							<TextField
								autoComplete="off"
								id="search"
								value={text}
								variant="outlined"
								onChange={this.handleChange}
								rows={10}
								multiline
								label="输入内容或拖入txt文件"
							/>
						</FormControl>
						<div className="clearfix"></div>
						<br></br>
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<Button
									fullWidth
									onClick={this.html2jsx.bind(this)}
									variant="contained"
								>
									转换为jsx
								</Button>
							</Grid>
							<Grid item xs={6}>
								<Button
									disabled={res === ""}
									fullWidth
									variant="outlined"
									id="becopy"
									data-clipboard-text={res}
								>
									复制结果
								</Button>
							</Grid>
						</Grid>
					</Grid>
					<Grid item md={6} xs={12}>
						<Result res={res} />
					</Grid>
				</Grid>
			</>
		);
	}
}
