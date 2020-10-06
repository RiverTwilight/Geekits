import React from "react";
import text2md from "./text2md"

const APP_MENU = [
	{
		icon: "image",
		style: "image",
		name: "图片",
	},
	{
		icon: "format_list_bulleted",
		style: "list",
		name: "列表",
	},
	{
		icon: "link",
		style: "link",
		name: "链接",
	},
	{
		icon: "keyboard_return",
		style: "enter",
		name: "换行",
	},
];

const TEXT_APP = [
	{
		style: "h1",
		text: "大标题",
	},
	{
		style: "h2",
		text: "中标题",
	},
	{
		style: "h3",
		text: "小标题",
	},
	{
		icon: "code",
		style: "code",
		name: "代码块",
	},
	{
		icon: "format_bold",
		style: "bold",
		name: "粗体",
	},
	{
		icon: "format_italic",
		style: "italic",
		name: "斜体",
	},
	{
		icon: "format_strikethrough",
		style: "clear",
		name: "中划线",
	},
	{
		icon: "format_underlined",
		style: "underline",
		name: "下划线",
	},
];

type ToolBarState = any;
type ToolBarProps = {
	undo: () => void;
	redo: () => void;
	textarea: any;
	content: string;
	cb: (newContent: string) => void;
};

const makeFunc = (textarea: any, content: any, style: any, cb: any) => {
	return () => {
		var start = textarea.selectionStart,
			end = textarea.selectionEnd;
		cb(text2md(content, style, start, end));
		textarea.focus();
		textarea.selectionStart = start;
		textarea.selectionEnd = end;
	};
};

class ToolBar extends React.Component<ToolBarProps, ToolBarState> {
	constructor(props: Readonly<ToolBarProps>) {
		super(props);
		this.state = {
			showTextApps: false,
			history: [],
		};
	}
	render() {
		const { showTextApps } = this.state;
		const { textarea, cb, content, undo, redo } = this.props;
		// TODO 使用component
		return (
			<>
				<div className="mdui-btn-group">
					<button
						onClick={() => {
							this.setState({ showTextApps: !showTextApps });
						}}
						type="button"
						className="mdui-btn"
					>
						<i
							className={`${
								showTextApps
									? "mdui-text-color-theme-accent"
									: ""
							} mdui-icon material-icons`}
						>
							font_download
						</i>
					</button>

					<button
						onClick={undo}
						type="button"
						className="mdui-btn"
					>
						<i className="mdui-icon material-icons">undo</i>
					</button>

					<button
						onClick={() => {
							redo();
						}}
						type="button"
						className="mdui-btn"
					>
						<i className="mdui-icon material-icons">redo</i>
					</button>
					{APP_MENU.map((a, i) => (
						<button
							key={i}
							mdui-tooltip={`{content: '${a.name}'}`}
							onClick={makeFunc(textarea, content, a.style, cb)}
							type="button"
							className="mdui-btn"
						>
							{a.icon ? (
								<i className="mdui-icon material-icons">
									{a.icon}
								</i>
							) : (
								a.name
							)}
						</button>
					))}
				</div>

				<div
					style={{ display: showTextApps ? "block" : "none" }}
					className="bottom-dashboard mdui-card mdui-p-a-1"
				>
					<div className="mdui-btn-group">
						{TEXT_APP.map((a, i) => (
							<button
								key={i}
								mdui-tooltip={`{content: '${
									a.name ? a.name : a.text
								}'}`}
								onClick={makeFunc(
									textarea,
									content,
									a.style,
									cb
								)}
								type="button"
								className="mdui-btn"
							>
								{a.icon ? (
									<i className="mdui-icon material-icons">
										{a.icon}
									</i>
								) : (
									a.text
								)}
							</button>
						))}
					</div>
				</div>
			</>
		);
	}
}

export default ToolBar;
