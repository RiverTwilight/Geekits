import React from "react";
import { snackbar, Dialog } from "mdui";
import Axios from "../utils/axios";
import { MD5 } from "crypto-js";
import { getUserInfo, setUserInfo } from "../utils/Services/UserInfo";
import SendCode from "../utils/Services/SendCode";
import { Input } from "mdui-in-react";

class Login extends React.Component<
	{
		ifOpen: boolean;
	},
	any
> {
	constructor(props: any) {
		super(props);
		this.state = {
			username: /*'wrj2014@126.com',*/ "",
			password: /*'123456',*/ "",
			remember: false,
		};
	}
	componentWillReceiveProps(nextProps: { ifOpen: any }) {
		const inst = new Dialog("#loginDialog", {
            history: false,
			destroyOnClosed: true,
			closeOnCancel: true,
			closeOnEsc: true,
			closeOnConfirm: true,
		});
		nextProps.ifOpen && inst.open();
		!nextProps.ifOpen && inst.close();
	}
	clientServer() {
		const { username, password, remember } = this.state;
		window.loadShow();
		Axios({
			method: "post",
			url: "/ygktool/user/login",
			withCredentials: false,
			data: {
				username: username,
				token: String(MD5(username + String(MD5(password)))),
			},
		})
			.then((response) => {
				var json = JSON.parse(response.request.response);
				switch (json.code) {
					case 1:
						snackbar({ message: "邮箱或密码错误" });
						break;
					case 666:
						var data = JSON.stringify(json.data);
						setUserInfo(data, remember);
						window.location.href = "/user";
				}
			})
			.catch((e) => {
				snackbar({ message: e });
			})
			.then(() => {
				window.loadHide();
			});
	}
	render() {
		const { password, username, remember } = this.state;
		return (
			<>
				<div id="loginDialog" className="mdui-dialog">
					<div className="mdui-dialog-title">登录</div>
					<div className="mdui-dialog-content">
						<Input
							onValueChange={(newText) => {
								this.setState({ username: newText });
							}}
                            header="邮箱"
                            placeholder="账户不存在将自动创建"
							icon="email"
							// @ts-expect-error ts-migrate(2322) FIXME: Type '"email"' is not assignable to type '"number"... Remove this comment to see the full error message
							type="email"
							value={username}
						/>
						<Input
							onValueChange={(newText) => {
								this.setState({ password: newText });
							}}
							header="密码"
							icon="lock"
							type="password"
							value={password}
						/>
						<label
							className="mdui-float-right mdui-checkbox"
						>
							<input
								onChange={(e) => {
									this.setState({
										remember: e.target.checked,
									});
								}}
								type="checkbox"
								checked={remember}
							/>
							<i className="mdui-checkbox-icon"></i>
							记住我
						</label>
					</div>
					<div className="mdui-dialog-actions">
						<button className="mdui-btn mdui-ripple">忘记密码</button>
						<button className="mdui-btn mdui-ripple">登录</button>
					</div>
				</div>
			</>
		);
	}
}

export default Login;
