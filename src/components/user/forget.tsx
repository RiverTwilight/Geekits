import React from "react";
import { snackbar } from "mdui";
import Axios from "../../utils/axios";
import SendCode from "../SendCode";
import { Input } from "mdui-in-react";

type ForgetState = any;

/**
 * 忘记密码页面
 * @author 江村暮
 */
class Forget extends React.Component<{}, ForgetState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			email: "",
			password: null,
			xcode: null,
		};
	}
	reset() {
		const { email, password, xcode } = this.state;
		window.loadShow();
		Axios({
			method: "post",
			url: "/ygktool/user/reset",
			withCredentials: false,
			data: {
				username: email,
				newPwd: password,
				xcode: xcode,
			},
		})
			.then((response) => {
				var json = JSON.parse(response.request.response);
				switch (json.code) {
					case 500:
						snackbar({ message: "服务器错误，请联系管理员" });
						break;
					case 2:
						snackbar({ message: "验证码错误" });
						break;
					case 666:
						snackbar({ message: "修改成功，即将跳转..." });
						setTimeout(() => (window.location.href = "/"), 2000);
						break;
				}
			})
			.then((_) => {
				window.loadHide();
			});
	}
	render() {
		const { password, email, xcode } = this.state;
		return (
			<>
				<div className="mdui-typo-headline">重置密码</div>
				<Input
					onValueChange={(newText) => {
						this.setState({ email: newText });
					}}
					header="邮箱"
					icon="email"
					type="email"
					value={email}
				/>
				<Input
					onValueChange={(newText) => {
						this.setState({ password: newText });
					}}
					header="新的密码"
					icon="lock"
					type="password"
					value={password}
				/>

				{email && (
					<SendCode
						onInput={(code: any) => {
							this.setState({ xcode: code });
						}}
						xcode={xcode}
						email={email}
					/>
				)}

				<button
					onClick={this.reset}
					disabled={!xcode || !password}
					className="loadBtn mdui-ripple mdui-color-theme mdui-fab mdui-fab-fixed"
				>
					<i className="mdui-icon material-icons">&#xe5ca;</i>
				</button>
			</>
		);
	}
}

export default Forget;
