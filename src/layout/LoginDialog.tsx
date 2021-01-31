import React from "react";
import { snackbar } from "mdui";
import Axios from "../utils/axios";
import { MD5 } from "crypto-js";
import { Input } from "mdui-in-react";
import { setUserInfo } from "../utils/Services/UserInfo";
import SendCode from "../components/SendCode";
import Dialog from "../components/Dialog";

class Login extends React.Component<
	{},
	{
		statu: "login" | "signin";
		username: string;
		password: string;
		remember: boolean;
		xcode: string;
	}
> {
	constructor(props: any) {
		super(props);
		this.state = {
			username: 'yungeeker@gmail.com',
			password: /*'123456',*/ "",
			remember: false,
			xcode: "",
			statu: "login",
		};
	}
	componentDidMount() {}
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
								statu: "signin",
							},
							() => {
								// window.dialogInst.handleUpdate();
							}
						);
						break;
					case 666:
						var data = JSON.stringify(json.data);
						setUserInfo(data, remember);
						window.location.href = "/user";
						break;
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
		const { password, username, remember, xcode, statu } = this.state;
		return (
			<>
				<div className="mdui-dialog-content">
					<Input
						onValueChange={(newText) => {
							this.setState({
								username: newText,
							});
						}}
						header="邮箱"
						placeholder="账户不存在将自动创建"
						icon="email"
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
					{statu === "signin" && (
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
					<button
						onClick={() => {
							window.open("/user/forget");
						}}
						className="mdui-btn mdui-ripple"
					>
						忘记密码
					</button>
					<button
						onClick={
							statu === "login"
								? this.login.bind(this)
								: this.signin.bind(this)
						}
						className="mdui-btn mdui-ripple"
					>
						注册/登录
					</button>
				</div>
			</>
		);
	}
}

const LoginDialog = (props: any) => {
	return (
		<Dialog
			config={{
				title: "加入云极客",
				confirmText: "登录/注册",
				cancelText: "忘记密码 ",
			}}
			{...props}
		>
			<Login />
		</Dialog>
	);
};

export default LoginDialog;
