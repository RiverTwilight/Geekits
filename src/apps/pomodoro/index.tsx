import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import LinearProgress from "@mui/material/LinearProgress";
import adaptiveBorder from "@/utils/adaptiveBorder";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DeleteIcon from '@mui/icons-material/Delete';

const Graph = ({ percent = 0.75 }: { percent: number; status: string }): JSX.Element => {
	const R: number = 150;

	const arc = {
		x: R + R * Math.cos((360 * percent - 90) * (Math.PI / 180)),
		y: R + R * Math.sin((360 * percent - 90) * (Math.PI / 180)),
	};

	return (
		<Box
			sx={{
				borderRadius: `${R}px`,
				border: (theme) => adaptiveBorder(theme, "solid", "5px"),
			}}
		>
			<svg width={R * 2} height={R * 2}>
				<circle cx={R} cy={R} r={R} fill="transparent" />

				<path
					style={
						{
							// transition: "2s all", Will add some bad effect
						}
					}
					fill="#28a745"
					d={`M${R} ${R}
					    L${R} 0 
						A${R} ${R}
						${percent > 0.5 ? 0 : 90} 
						${percent >= 0.5 ? 1 : 0}
						1 
						${arc.x} ${arc.y}
						Z`}
				/>
			</svg>
		</Box>
	);
};

const BUTTON_SIZE = "80px";

const RoundButton = styled(Button)<ButtonProps>(({ theme }) => ({
	height: BUTTON_SIZE,
	width: BUTTON_SIZE,
	borderRadius: "50%",
	background: theme.palette.primary.main,
	color: theme.palette.primary.contrastText,
}));

interface recordItem {
	name: string;
	metaDate: string;
	date: string;
}

const Record = ({ closeBottomAlert }: { closeBottomAlert: () => void }) => {
	!localStorage.tomato && localStorage.setItem("tomato", "[]");
	const historyData = JSON.parse(localStorage.tomato);
	const now = new Date();
	const clearHistory = () => {
		mdui.JQ.hideOverlay();
		closeBottomAlert && closeBottomAlert();
		// @ts-expect-error ts-migrate(2339) FIXME: Property 'confirm' does not exist on type 'IMduiSt... Remove this comment to see the full error message
		mdui.confirm(
			"此操作不可逆！",
			"清除历史记录",
			() => {
				localStorage.setItem("tomato", "[]");
			},
			() => {},
			{
				confirmText: "确定",
				cancelText: "我手残了",
				history: false,
			}
		);
	};
	return (
		<>
			<LinearProgress
				variant="determinate"
				value={
					historyData.length / 4 > 1
						? historyData.length / 4 - 1
						: historyData.length / 4
				}
			/>
			<div className="mdui-p-a-2 mdui-typo">
				<b>今日：</b>
				{
					historyData.filter(
						(item: recordItem) =>
							item.metaDate === now.toLocaleDateString()
					).length
				}
				<br></br>
				<b>总计：</b>
				{historyData.length}
				<p className="mdui-text-color-black-secondary">
					每个番茄完成后，你可以休息5分钟。每四个番茄完成后，你可以休息地更久一点。
				</p>
			</div>
			<div className="mdui-divider"></div>
			<ul className="mdui-list">
				{historyData.map((item: recordItem, i) => (
					<li key={i} className="mdui-list-item mdui-ripple">
						<i className="mdui-icon mdui-text-color-red material-icons">
							access_alarms
						</i>
						<div className="mdui-list-item-content">
							<div className="mdui-list-item-title">
								{item.name}
							</div>
							<div className="mdui-list-item-text">
								{item.date}
							</div>
						</div>
					</li>
				))}
				<button
					style={{
						display: historyData.length ? "block" : "none",
					}}
					onClick={clearHistory}
					className="mdui-btn mdui-btn-block mdui-ripple"
				>
					清空记录
				</button>
			</ul>
		</>
	);
};

type TomatoClockState = any;

const formatTime = (time: number, useString?: string): any => {
	const min = Math.floor(time / 60);
	const sec = time % 60;
	if (useString)
		return `${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;
	return {
		min,
		sec,
	};
};

enum StatusSet {
	work = "work",
	sleep = "sleep",
}

export default class Pomodoro extends React.Component<
	{},
	{
		status: StatusSet;
		restSeconds: number;
		defaultSeconds: number;
		title: string;
	}
> {
	constructor(props: {}) {
		super(props);
		this.state = {
			defaultSeconds: 25 * 60,
			restSeconds: 25 * 60,
			status: StatusSet.sleep,
			title: "",
		};
	}

	componentWillUnmount() {
		clearInterval(window.tomato);
		document.title = this.state.originTitle;
	}

	startATomato = () => {
		window.tomato && clearInterval(window.tomato);

		const cb = () => {
			const { restSeconds, title, status } = this.state;
			if (restSeconds <= 0) {
				this.playRingtone();
				if (status === StatusSet.work) {
					window.snackbar({
						message: "你完成了一个番茄，现在休息五分钟吧！",
					});
					const originData = JSON.parse(localStorage.tomato),
						now = new Date();
					originData.push({
						metaDate: now.toLocaleDateString(),
						date: now.toLocaleString(),
						name: title === "" ? "未命名" : title,
					});
					localStorage.setItem("tomato", JSON.stringify(originData));
					this.setState(
						{
							status: StatusSet.sleep,
						},
						() => {
							this.startATomato();
						}
					);
				} else {
					this.setState(
						{
							status: StatusSet.work,
						},
						() => {
							this.startATomato();
						}
					);
				}
			} else if (status === StatusSet.work) {
				document.title = `${formatTime(restSeconds, true)} | ${
					this.state.originTitle
				}`;
				this.setState({
					restSeconds: restSeconds - 1,
				});
			}
		};

		this.setState({
			status: StatusSet.work,
		});

		window.tomato = setInterval(cb, 1000);
	};

	playRingtone() {
		const sound = new Audio("/audio/alarm.mp3");
		if (!sound.paused) sound.pause();
		sound.currentTime = 0;
		sound.play();
	}

	abandonTomato = () => {
		const { status, restSeconds, defaultSeconds } = this.state;
		// 含文本、标题和确认按钮回调
		if (status === StatusSet.work && restSeconds > 0) {
			this.setState({
				restSeconds: defaultSeconds,
				status: StatusSet.sleep,
			});
		}
	};

	render() {
		const { restSeconds, defaultSeconds, title, status } = this.state;
		return (
			<>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
					}}
				>
					{/* <Input
						value={title}
						placeholder="给这颗番茄起个名字吧"
						onValueChange={(newText) => {
							this.setState({
								title: newText,
							});
						}}
					/> */}

					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
						}}
					>
						<Graph
							percent={
								(defaultSeconds - restSeconds) / defaultSeconds
							}
							status={status}
						/>
						<Box
							sx={{
								position: "absolute",
								top: "123px",
							}}
						>
							<Typography sx={{
								fontFamily: "Product Sans"
							}} align="right" variant="h2">
								{formatTime(restSeconds, true)}
							</Typography>
						</Box>
					</Box>

					<br></br>

					<br></br>

					{status == StatusSet.sleep && (
						<Box sx={{ display: "flex", justifyContent: "center" }}>
							<RoundButton onClick={this.startATomato}>
								<PlayArrowIcon />
							</RoundButton>
						</Box>
					)}

					{status === StatusSet.work && (
						<Box sx={{ display: "flex", justifyContent: "center" }}>
							<RoundButton onClick={this.abandonTomato}>
								<DeleteIcon />
							</RoundButton>
						</Box>
					)}
				</Box>
			</>
		);
	}
}
