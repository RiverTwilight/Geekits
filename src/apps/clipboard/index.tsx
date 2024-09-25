import React from "react";
import { useRouter } from "next/router";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import { Theme } from "@mui/material/styles";
import createStyles from "@mui/styles/createStyles";
import withStyles from "@mui/styles/withStyles";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import Link from "next/link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import pinyin from "js-pinyin";
import useEventListener from "@/utils/Hooks/useEventListener";
import ClipboardJS from "clipboard";
import io from "socket.io-client";
import QRCode from "qrcode";
import saveFile from "../../utils/fileSaver";
import { Box } from "@mui/material";

// Doc https://ntfy.sh/docs/subscribe/api/

const Share = ({ qrcode, token }: any) => (
	<>
		<ul className="mdui-menu" id="share">
			<img alt="扫描此二维码" src={qrcode}></img>

			<li>
				从其他设备访问此页链接[
				<a
					data-clipboard-text={window.location.href + "#/" + token}
					className="mdui-text-color-theme copy"
				>
					&nbsp;复制&nbsp;
				</a>
				]或扫描二维码
			</li>
		</ul>

		<button
			style={{
				position: "fixed",
				bottom: "180px",
				right: "10px",
			}}
			mdui-menu="{target: '#share',gutter:'-20', covered:false}"
			className="mdui-color-theme mdui-fab mdui-fab-mini"
		>
			<i className="mdui-icon material-icons">&#xe80d;</i>
		</button>
	</>
);

const MsgList = ({ data }: any) => {
	if (!data.length) {
		return <p className="mdui-text-center">点击右下角"分享"按钮添加设备</p>;
	}
	const list = data.map((a: any, i: any) => {
		if (a.type === "text") {
			return (
				<li
					onClick={() => {
						mduiAlert(a.content, () => {}, { history: false });
					}}
					key={i}
					className="mdui-list-item mdui-ripple"
				>
					<i className="mdui-list-item-avatar mdui-icon material-icons">
						assignment
					</i>

					<div className="mdui-list-item-content">
						<div className="mdui-list-item-title mdui-list-item-two-line">
							{a.content}
						</div>

						<div className="mdui-list-item-text mdui-list-item-one-line">
							{a.time}
						</div>
					</div>

					<button
						data-clipboard-text={a.content}
						className="copy mdui-btn mdui-btn-icon"
					>
						<i className="mdui-list-item-icon mdui-icon material-icons">
							content_copy
						</i>
					</button>
				</li>
			);
		} else {
			return (
				<li key={i} className="mdui-list-item mdui-ripple">
					<i className="mdui-list-item-avatar mdui-icon material-icons">
						folder
					</i>

					<div className="mdui-list-item-content">
						<div className="mdui-list-item-title">
							{a.content.name}
						</div>

						<div className="mdui-list-item-text">
							{a.content.size}
						</div>
					</div>

					<button
						onClick={() => {
							// @ts-expect-error ts-migrate(2345) FIXME: Property 'type' is missing in type '{ file: any; f... Remove this comment to see the full error message
							saveFile({
								file: a.content.data,
								filename: a.content.name,
							});
						}}
						className="mdui-btn mdui-btn-icon"
					>
						<i className="mdui-icon material-icons">
							file_download
						</i>
					</button>
				</li>
			);
		}
	});
	return <ul className="mdui-list mdui-row-md-2">{list}</ul>;
};

type ComponentState = any;

export default class extends React.Component<{}, ComponentState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			textData: "",
			fileData: null,
			receivedData: [],
			token: "", //所有设备的共同口令
			// @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
			deviceId: parseInt(Math.random() * (9999 - 0 + 1) + 0, 10), //当前设备标识口令
			qrcode: "",
			socket: null,
			pwd: null,
			originTitle: document.title,
			connectState: "ok",
		};
	}
	componentWillMount() {
		if (window.location.hash) {
			const token = /^\#\/(\d+)$/.exec(window.location.hash)[1];
			this.setState({
				token: Number(token),
			});
		} else {
			//没有则生成token
			const td = new Date();
			var token = td.getTime();
			this.setState({
				token: token,
			});
		}
	}
	componentWillUnmount() {
		this.state.socket.close();
		document.removeEventListener("visibilitychange", () => {});
	}
	componentDidMount() {
		window.addEventListener("visibilitychange", () => {
			//还原默认标题
			if (!document.hidden) {
				document.title = this.state.originTitle;
			}
		});

		const cb = (data: any) => {
			this.setState(data);
			if (document.hidden) {
				if (document.title.match("新消息")) {
				} else {
					document.title = "(新消息)" + document.title;
				}
			}
		};

		clipboard && clipboard.destroy();
		var clipboard = new ClipboardJS(".copy");
		clipboard.on("success", (e) => {
			snackbar({ message: "已复制" });
			e.clearSelection();
		});

		const { token, receivedData, deviceId } = this.state;

		QRCode.toDataURL(
			window.location.href + "#/" + this.state.token,
			(err: any, url: any) => {
				if (err) throw err;
				cb({
					qrcode: url,
				});
			}
		);

		const socket = io("wss://ntfy.ygktool.com/", {
			path: deviceId,
			query: {
				token: token,
			},
			//transports: ['websocket']//取消轮询
		});

		this.setState({ socket: socket });

		socket.on("disconnect", (msg: any) => {
			this.setState({
				connectState: "正在尝试重连...",
			});
		});

		socket.on("connect", () => {
			this.setState({
				connectState: "OK",
			});
		});

		socket.on("message", (msg: any) => {
			if (msg.deviceId === deviceId) {
				console.log("clint message");
				window.hideGlobalLoadingOverlay();
				// 接收到本机消息后清空草稿
				if (msg.type === "text") {
					this.setState({
						textData: "",
					});
				} else {
					this.setState({
						fileData: null,
					});
				}
			}
			let { type, content, time } = msg;
			let newData = { type, content, time };
			receivedData.push(newData);
			cb({ data: receivedData, content: "" });
		});
	}
	sendMsg() {
		window.showGlobalLoadingOverlay();
		const metaDate = new Date().toLocaleTimeString();
		const { textData, fileData, token, socket, pwd, deviceId } = this.state;
		textData !== "" &&
			socket.emit("chat_message", {
				content: textData,
				type: "text",
				token,
				time: metaDate,
				deviceId,
			});
		fileData &&
			socket.emit("chat_message", {
				content: fileData,
				type: "file",
				token,
				time: metaDate,
				deviceId,
			});
	}
	render() {
		const { qrcode, receivedData, textData, token, connectState } =
			this.state;
		return (
			<>
				<MsgList data={receivedData} />

				<Box>
					<FormControl fullWidth className={classes.input}>
						<TextField
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<SearchSharpIcon />
									</InputAdornment>
								),
							}}
							inputRef={(ref) => (this.searchInput = ref)}
							autoComplete="off"
							value={textData}
							variant="outlined"
							label="输入要发送的内容，大于3000字符请发送文件"
						/>
					</FormControl>
				</Box>

				<Box>
					<Button onClick={this.sendMsg.bind(this)}>发送</Button>

					<button className="mdui-float-left mdui-btn">
						<i className="mdui-icon mdui-icon-left material-icons">
							&#xe63e;
						</i>
						{connectState}
					</button>
					{/*<button
                        onClick={()=>{
                            mdui.prompt(
                                '',
                                '设置密码',
                                value => {this.setState({pwd:value})},
                                value => {}, {
                                    type: 'text',
                                    maxlength: 20,
                                    confirmText: '保存',
                                    cancelText: '取消',
                                    history:false
                                }
                            )
                        }}
                        className="mdui-float-right mdui-btn">
                        <i className="mdui-icon-left mdui-icon material-icons">vpn_key</i>
                        设置密码
                    </button>*/}
				</Box>
				<Share token={token} qrcode={qrcode} />
			</>
		);
	}
}
