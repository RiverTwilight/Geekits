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
			showXcode: false,
			dialogInst: null,
			xcode: "",
		};
	}
	componentDidUpdate() {
		window.dialogInst = new Dialog("#loginDialog", {
			history: false,
			destroyOnClosed: true,
			closeOnCancel: false,
			closeOnEsc: true,
			closeOnConfirm: false,
		});
		this.props.ifOpen && window.dialogInst.open();
		!this.props.ifOpen && window.dialogInst.close();
	}
	signin() {
		const { username, password, xcode, remember } = this.state;
		window.loadShow();
		Axios({
			method: "post",
			url: "/ygktool/user/signin",
			withCredentials: false,
			data: {
				username,
				password,
				xcode,
				inviteCode: 20284,
			},
		})
			.then((response) => {
				var json = JSON.parse(response.request.response);
				switch (json.code) {
					case 1:
						snackbar({ message: "用户已存在" });
						break;
					case 3:
						snackbar({ message: "验证码错误" });
						break;
					case 666:
						var data = JSON.stringify(json.data);
						setUserInfo(data, remember);
						 window.location.href = "/user";
						break;
				}
			})
			.then(() => {
				window.loadHide();
			});
	}
	login() {
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
					case 413:
						snackbar({ message: "邮箱或密码错误" });
						break;
					case 412:
						// 切换成注册模式
						this.setState(
							{
								showXcode: true,
							},
							() => {
								window.dialogInst.handleUpdate();
							}
						);
						break;
					case 666:
						var data = JSON.stringify(json.data);
						setUserInfo(data, remember);
						window.location.href = "/user";
						break
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
		const { password, username, remember, xcode, showXcode } = this.state;
		return (
			<>
				<div id="loginDialog" className="mdui-dialog">
					<div className="mdui-dialog-title">加入云极客</div>
					<div className="mdui-dialog-content">
						<Input
							onValueChange={(newText) => {
								this.setState({ 
									username: newText,
									showXcode: false
								 });
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
						{showXcode && (
							<SendCode
								onInput={(code: any) => {
									this.setState({ xcode: code });
								}}
								xcode={xcode}
								email={username}
							/>
						)}
						<div className="mdui-clearfix"></div>
						<label className="mdui-float-right mdui-checkbox">
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
						<button className="mdui-btn mdui-ripple">
							忘记密码
						</button>
						<button
							onClick={
								showXcode
									? this.signin.bind(this)
									: this.login.bind(this)
							}
							className="mdui-btn mdui-ripple"
						>
							登录
						</button>
					</div>
				</div>
			</>
		);
	}
}

export default Login;
