import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import { Theme } from "@mui/material/styles";
import createStyles from "@mui/styles/createStyles";
import withStyles from "@mui/styles/withStyles";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import React from "react";
import Link from "next/link";
import Axios from "../../utils/axios";
import { setCookie } from "../../utils/cookies";
import { setUserInfo } from "../../utils/Services/UserInfo";
import SendCode from "../SendCode";
import { Typography } from "@mui/material";

const styles = (theme: Theme) => {
	return createStyles({
		action: {
			width: "100%",
		},
		imageIcon: {
			height: "100%",
			transform: "translate(0px, -4px)",
		},
		iconRoot: {
			textAlign: "center",
		},
	});
};

class LoginForm extends React.Component<
	{
		classes: any;
	},
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
			username: "198586335@qq.com",
			password: "12345678",
			remember: false,
			xcode: "",
			statu: "login",
			showPassword: false,
		};
	}
	componentDidMount() {}
	signin() {
		const { username, password, remember } = this.state;
		window.showGlobalLoadingOverlay();
		Axios({
			method: "post",
			url: "/userContent/auth/local/register",
			data: {
				username,
				email: username,
				password,
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
				window.hideGlobalLoadingOverlay();
			});
	}
	login() {
		const { username, password } = this.state;
		// window.showGlobalLoadingOverlay();

		Axios.post("/userContent/auth/local", {
			identifier: username,
			password,
		})
			.then((response) => {
				console.log(response);
				switch (response.data.statusCode) {
					case 400:
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
						setCookie("YGKUID", response.data.jwt, 15);
						localStorage.setItem(
							"username",
							response.data.username
						);
						window.location.href = "/user";
						break;
				}
			})
			.catch((e) => {
				console.log(e);
			})
			.then(() => {
				window.hideGlobalLoadingOverlay();
			});
	}
	handleClickShowPassword = () => {
		this.setState({
			showPassword: !this.state.showPassword,
		});
	};
	render() {
		const { password, username, xcode, statu, showPassword } = this.state;
		const { classes } = this.props;
		return (
			<>
				<FormControl fullWidth>
					<InputLabel htmlFor="username">邮箱</InputLabel>
					<Input
						onChange={(e) => {
							this.setState({
								username: e.target.value,
							});
						}}
						value={username}
						id="username"
						autoFocus
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
					<InputLabel htmlFor="password">密码</InputLabel>
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
									size="large"
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
				{/* <FormControlLabel
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
                /> */}
				<br />
				<br />
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<Button
							onClick={() => {
								window.open("/user/forget");
							}}
							className={classes.action}
							variant="outlined"
						>
							忘记密码
						</Button>
					</Grid>
					<Grid item xs={6}>
						<Button
							onClick={this.login.bind(this)}
							className={classes.action}
							variant="contained"
							color="primary"
						>
							登录
						</Button>
					</Grid>
				</Grid>

				<Typography variant="body2">
					登录即表示您同意
					<a link="/terms">服务协议</a>
				</Typography>

				<p>
					<Divider />
				</p>

				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Button
							className={classes.action}
							variant="outlined"
							component={"a"}
							href="https://ygk-api.yunser.com/userContent/connect/github"
							startIcon={
								<Icon classes={{ root: classes.iconRoot }}>
									<img
										className={classes.imageIcon}
										src="/svg/logo-google.svg"
									/>
								</Icon>
							}
						>
							使用Google账号继续
						</Button>
					</Grid>
				</Grid>
			</>
		);
	}
}

export default withStyles(styles)(LoginForm);
