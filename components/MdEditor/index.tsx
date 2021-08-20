import React from "react";
import ToolBar from "./TooBar";

type TState = any;
type TProps = {
	live: boolean;
	/**
	 * MD字符串
	 */
	content: string;
	/**
	 * 回调函数
	 * @param newContent 新的MD字符串
	 */
	cb(newContent: string): any;
};

/**
 * Markdown编辑器
 * @author 江村暮
 * // TODO 插入链接显示对话框
 * // TODO 移动端保存选中状态
 */

class MdEditor extends React.Component<TProps, TState> {
	textareaDom: HTMLTextAreaElement | null | undefined;
	constructor(
		props: Readonly<{
			live: boolean;
			content: string;
			cb(newContent: string): any;
		}>
	) {
		super(props);
		this.state = {
			history: [props.content],
			editVersion: 0,
		};
	}
	undo = () => {
		const { editVersion, history } = this.state;
		const { cb } = this.props;
		if (editVersion > 0) {
			cb(history[editVersion - 1]);
			this.setState({
				editVersion: editVersion - 1,
			});
		}
	};
	redo = () => {
		const { editVersion, history } = this.state;
		const { cb } = this.props;
		if (editVersion < history.length - 1) {
			cb(history[editVersion + 1]);
			this.setState({
				editVersion: editVersion + 1,
			});
		}
	};
	render() {
		const { content, cb } = this.props;
		const { history } = this.state;
		return (
			<>
				<ToolBar
					content={content}
					textarea={this.textareaDom}
					cb={(newSet: any) => {
						cb(newSet);
						history.push(newSet);
						this.setState({
							history: history,
							editVersion: history.length - 1,
						});
					}}
					undo={this.undo}
					redo={this.redo}
				/>
				<div className="mdui-divider"></div>
				<div className="mdui-textfield">
					<textarea
						style={{ cursor: "text" }}
						ref={(r) => (this.textareaDom = r)}
						placeholder="内容会自动保存，支持markdown"
						rows={40}
						onChange={(e) => {
							cb(e.target.value);
							history.push(e.target.value);
							this.setState({
								history: history,
								editVersion: history.length - 1,
							});
						}}
						value={content}
						autoFocus
						className="mdui-textfield-input"
					></textarea>
				</div>
			</>
		);
	}
}

export default MdEditor;
