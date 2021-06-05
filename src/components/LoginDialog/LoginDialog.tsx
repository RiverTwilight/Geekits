import React, { useState } from "react";
import Axios from "../../utils/axios";
import { MD5 } from "crypto-js";
import { setUserInfo } from "../../utils/Services/UserInfo";
import SendCode from "../SendCode";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import AccountCircle from "@material-ui/icons/AccountCircle";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { setCookie } from "../../utils/cookies";
import { store as loginDialogStore } from "../../data/loginDialogState";

class Login extends React.Component<
	{},
	{
		statu: "login" | "signin";
		username: string;
		password: string;
		remember: boolean;
		xcode: string;
		showPassword: boolean;
	}
> {
	constructor(props: any) {
		super(props);
		this.state = {
			username: "",
			password: /*'123456',*/ "",
			remember: false,
			xcode: "",
			statu: "login",
			showPassword: false,
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
						window.snackbar({ message: "用户已存在" });
						break;
					case 3:
						window.snackbar({ message: "验证码错误" });
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
				switch (response.status) {
					case 413:
						window.snackbar({ message: "邮箱或密码错误" });
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
					case 200:
						setCookie("YGKUID", response.data.YGKUID, 15)
						window.location.href = "/user";
						break;
				}
			})
			.catch((e) => {
				window.snackbar({ message: e });
			})
			.then(() => {
				window.loadHide();
			});
	}
	handleClickShowPassword = () => {
		this.setState({
			showPassword: !this.state.showPassword,
		});
	};
	render() {
		const {
			password,
			username,
			remember,
			xcode,
			statu,
			showPassword,
		} = this.state;
		return (
			<>
				<DialogContent>
					<FormControl fullWidth>
						<InputLabel htmlFor="username">
							邮箱
						</InputLabel>
						<Input
							onChange={(e) => {
								this.setState({
									username: e.target.value,
								});
							}}
							value={username}
							id="username"
							placeholder="账户不存在将自动创建"
							startAdornment={
								<InputAdornment position="start">
									<AccountCircle />
								</InputAdornment>
							}
						/>
					</FormControl>
					<br></br>
					<br></br>
					<FormControl fullWidth>
						<InputLabel htmlFor="password">
							密码
						</InputLabel>
						<Input
							onChange={(e) => {
								this.setState({
									password: e.target.value,
								});
							}}
							value={password}
							id="password"
							type={showPassword ? "text" : "password"}
							startAdornment={
								<InputAdornment position="start">
									<VpnKeyIcon />
								</InputAdornment>
							}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={this.handleClickShowPassword}
									>
										{showPassword ? (
											<Visibility />
										) : (
											<VisibilityOff />
										)}
									</IconButton>
								</InputAdornment>
							}
						/>
					</FormControl>
					{statu === "signin" && (
						<SendCode
							onInput={(code: any) => {
								this.setState({ xcode: code });
							}}
							xcode={xcode}
							email={username}
						/>
					)}
					<FormControlLabel
						control={
							<Checkbox
								checked={remember}
								onChange={(e) => {
									this.setState({
										remember: e.target.checked,
									});
								}}
								name="remember"
								color="primary"
							/>
						}
						label="下次自动登录"
					/>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => {
							window.open("/user/forget");
						}}
					>
						忘记密码
					</Button>
					<Button
						onClick={
							statu === "login"
								? this.login.bind(this)
								: this.signin.bind(this)
						}
					>
						注册/登录
					</Button>
				</DialogActions>
			</>
		);
	}
}

const LoginDialog = () => {
	const [ open, setOpen ] = useState(true);
	const handleClose = () => {
		loginDialogStore.dispatch({type: "loginDialog/closed"})
	}

	loginDialogStore.subscribe(() => setOpen(loginDialogStore.getState().value));

	return (
		<Dialog
			open={open}
			onClose={handleClose}
		>
			<DialogTitle id="simple-dialog-title">加入云极客</DialogTitle>
			<Login />
		</Dialog>
	);
};

export default LoginDialog;
