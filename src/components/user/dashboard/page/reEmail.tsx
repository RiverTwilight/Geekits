import React from "react";
import {
	removeUserInfo,
	getUserInfo,
} from "../../../../utils/Services/UserInfo";
import { Input, Button } from "mdui-in-react";
import SendCode from "../../../SendCode";
import Axios from "../../../../utils/axios";
import { snackbar } from "mdui";

type State = any;

class Ui extends React.Component<{}, State> {
	constructor(props: {}) {
		super(props);
		this.state = {
			//@ts-expect-error
			username: getUserInfo().username,
			email: null,
			xcode: null,
		};
	}
	reset() {
		const { username, email, xcode } = this.state;
		window.loadShow();
		Axios({
			method: "post",
			url: "https://api.ygktool.cn/ygktool/user/reset",
			withCredentials: false,
			data: {
				username: username,
				newEmail: email,
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
					case 1:
						snackbar({ message: "该邮箱已被注册！" });
						break;
					case 666:
						snackbar({ message: "修改成功，即将退出..." });
						removeUserInfo();
						setTimeout(
							() => (window.location.href = "/user/login"),
							2000
						);
						break;
				}
			})
			.then(() => {
				window.loadHide();
			});
	}
	render() {
		const { email, xcode } = this.state;
		return (
			<>
				<Input
					onValueChange={(newText) => {
						this.setState({ email: newText });
					}}
					header="新的邮箱"
					icon="email"
					type="email"
					value={email}
				/>
				<SendCode
					onInput={(code) => {
						this.setState({ xcode: code });
					}}
					xcode={xcode}
					email={email}
				/>
				<Button
					onClick={this.reset}
					disabled={!xcode}
                    icon="check"
                    title="确认修改"
				/>
			</>
		);
	}
}

export default Ui;
