import React from "react";
import Axios from "../../utils/axios";

type State = any;

// see: https://i.stack.imgur.com/KOQrY.png
var waiting: NodeJS.Timer;

// HACK 验证码模块重构
class SendCode extends React.Component<
	{
		onInput(newText: string): void;
		xcode: any;
		email: string;
	},
	State
> {
	constructor(
		props: Readonly<{
			onInput(newText: string): void;
			xcode: any;
			email: string;
		}>
	) {
		super(props);
		this.state = {
			waitProgress: 61,
		};
	}
	componentWillUnmount() {
		waiting && clearInterval(waiting);
	}
	getCode = () => {
		var { waitProgress } = this.state;
		waiting = setInterval(() => {
			if (waitProgress < 0) {
				clearInterval(waiting);
				this.setState({ waitProgress: 61 }, () =>
					// @ts-expect-error
					setInterval(waiting)
				);
			} else {
				waitProgress--;
				this.setState({ waitProgress: waitProgress });
			}
		}, 1000);
		Axios.get("/ygktool/xcode?email=" + this.props.email).then(
			(response) => {
				var json = JSON.parse(response.request.response);
				switch (json.code) {
					case 500:
						snackbar({ message: "验证码发送失败，请重试" });
						break;
					case 666:
						snackbar({
							message: "验证码已发送，请注意检查邮箱垃圾桶",
						});
						break;
					default:
						snackbar({ message: "验证码发送失败，请重试" });
				}
			}
		);
	};
	render() {
		const { waitProgress } = this.state;
		const onWaiting = waitProgress >= 0 && waitProgress <= 60;
		const { onInput, xcode, email } = this.props;
		return (
			<>
				<Input
					onValueChange={onInput}
					header="验证码"
					icon="verified_user"
					type="number"
					value={xcode}
				/>
				<button
					onClick={this.getCode}
					disabled={onWaiting}
					className="mdui-float-right mdui-btn mdui-color-theme"
				>
					{`发送验证码${onWaiting ? `(${waitProgress}s)` : ""}`}
				</button>
			</>
		);
	}
}

export default SendCode;
