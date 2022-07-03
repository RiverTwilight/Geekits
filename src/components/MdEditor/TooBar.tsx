import React from "react";
import InsertLink from "./InsertLink";
import text2md from "./text2md";
import { Button } from "mdui-in-react";

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
			isOpen: false,
		};
	}
	handleInsertLink = (link: any, text: any) => {
		const point = this.props.textarea.selectionStart;
		this.props.cb(`[${text}](${link})`);
		this.setState({ isOpen: false });
	};
	render() {
		const { showTextApps, isOpen } = this.state;
		const { textarea, cb, content, undo, redo } = this.props;
		return (
			<>
				<InsertLink isOpen={isOpen} onConfirm={this.handleInsertLink} />
				<div className="mdui-btn-group">
					<Button
						onClick={() => {
							this.setState({ showTextApps: !showTextApps });
						}}
						type="button"
						icon="font_download"
						iconColor={`${
							showTextApps ? "theme" : "default"
						}`}
					/>
					<Button
						onClick={() => {
							this.setState({ isOpen: !isOpen });
						}}
						type="button"
						icon="link"
						iconColor="default"
					/>

					<Button
						iconColor="default"
						icon="undo"
						onClick={undo}
						type="button"
					/>
					<Button
						iconColor="default"
						icon="redo"
						onClick={redo}
						type="button"
					/>

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
