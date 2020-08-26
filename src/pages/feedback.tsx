import React from "react";
import { updateSpinners, snackbar } from "mdui";
import { Input } from "mdui-in-react";

type State = any;

export default class extends React.Component<{}, State> {
	constructor(props: {}) {
		super(props);
		this.state = {
			contact: "",
			content: "",
		};
	}
	componentDidMount() {
		updateSpinners();
	}
	sendData() {
		const { content, contact } = this.state;
		window.loadShow();
		fetch("https://api.ygktool.cn/ygktool/feedback", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				content: content,
				contact: contact,
			}),
		})
			.then((res) => {
				snackbar({ message: "提交成功，我会尽快处理^_^" });
			})
			.catch((err) => {
				snackbar({ message: "出错了！" + err });
			})
			.then(() => {
				window.loadHide();
			});
	}
	render() {
		window.updateTitle("意见反馈");
		const { content, contact } = this.state;
		return (
			<div className="mdui-col-md-10">
				<Input
					onValueChange={(newText) => {
						this.setState({ contact: newText });
					}}
					header="联系方式"
					placeholder="例 QQ:1985386335"
					value={contact}
				/>

				<Input
					onValueChange={(newText) => {
						this.setState({ content: newText });
					}}
					placeholder="内容"
					value={content}
					// @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number | ... Remove this comment to see the full error message
					rows="5"
				/>

				<button
					onClick={this.sendData.bind(this)}
					className="mdui-color-theme loadBtn mdui-btn mdui-btn-raised"
				>
					提交
				</button>
			</div>
		);
	}
}
