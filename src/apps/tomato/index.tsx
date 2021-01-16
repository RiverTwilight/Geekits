import React from "react";
import mdui from "mdui";
import { Input, BottomAlert } from "mdui-in-react";
import "./style.css";

/*
const sayings = [
	{
		content: "自律是一种秩序，一种对快乐和欲望的控制。",
		author: "柏拉图",
	},
	{
		content: "时刻提醒自己，要自律，要保持份内在的从容与安静。",
		author: "网络",
	},
	{
		content: "越自律，越自由。",
		author: "网络",
	},
];

const Saying = ({ index }) => {
	const saying = sayings[index];
	return (
		<div className="mdui-typo">
			<blockquote>
				{saying.content}
				<footer>{saying.author}</footer>
			</blockquote>
		</div>
	);
};
*/

function d2a(n: number) {
	return (n * Math.PI) / 180;
}

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
			<div className="mdui-progress">
				<div
					className="mdui-progress-determinate"
					style={{
						width: `${
							(historyData.length / 4 > 1
								? historyData.length / 4 - 1
								: historyData.length / 4) * 100
						}%`,
					}}
				></div>
			</div>
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
				{/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type. */}
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

const Tomato = ({
	r = 34,
	ang = 20,
	startWorking,
	addTime,
	timeStr,
	statu,
}: {
	r?: number;
	ang?: number;
	startWorking: () => void;
	addTime: () => void;
	timeStr: string;
	statu: "sleep" | "rest" | "working";
}) => {
	const ang1 = ang;
	const ang2 = 360;
	const handleClick = () => {
		let func = {
			sleep: startWorking,
			rest: addTime,
			working: () => {},
		};
		func[statu]();
	};
	return (
		<button
			onClick={handleClick}
			className="mdui-shadow-0 mdui-fab mdui-color-theme tomato-box"
		>
			<button
				style={{
					backgroundColor: document.body.classList.contains(
						"mdui-theme-layout-dark"
					)
						? "#303030"
						: "#fff",
				}}
				className={`mdui-shadow-0 mdui-fab mask`}
			></button>
			<svg
				width="250"
				height="250"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="15 15 70 70"
			>
				<circle
					cx="50"
					cy="50"
					r={r}
					stroke="#fff"
					strokeWidth="8"
					fill="transparent"
				/>
				<path
					strokeLinecap="round"
					d={`M50 50 
				L${50 + Math.sin(d2a(ang1)) * r} ${50 - Math.cos(d2a(ang1)) * r}
				A${r} ${r} 0 ${ang2 - ang1 >= 180 ? 1 : 0} 1 ${50 + Math.sin(d2a(ang2)) * r} ${
						50 - Math.cos(d2a(ang2)) * r
					} Z`}
					stroke="#4caf50"
					fill="transparent"
					strokeWidth="2.8"
				/>
			</svg>
			<div className="statu mdui-text-color-theme">
				{
					{
						working: "工作中",
						rest: "点击延长休息时间",
						sleep: "开始一个番茄",
					}[statu]
				}
			</div>
			<div className="tt-countdown mdui-text-color-theme">{timeStr}</div>
		</button>
	);
};

type TomatoClockState = any;

// FIXME 番茄钟无法使用
export default class TomatoClock extends React.Component<{}, TomatoClockState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			min: 25,
			sec: 0,
			statu: "sleep",
			originTitle: document.title,
			showHistory: false,
			title: "",
		};
	}
	componentWillUnmount() {
		clearInterval(window.tomato);
		document.title = this.state.originTitle;
	}
	startATomato(minute = 25) {
		window.tomato && clearInterval(window.tomato);
		const cb = () => {
			const { min, sec, title, statu } = this.state;
			if (!min && !sec) {
				this.playRingtone();
				if (statu === "working") {
					mdui.snackbar({
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
							statu: "rest",
						},
						() => {
							this.startATomato(5);
						}
					);
				} else {
					this.setState(
						{
							statu: "working",
						},
						() => {
							this.startATomato();
						}
					);
				}
			} else {
				const newTime = {
					sec: sec - 1 < 0 ? 59 : sec - 1,
					min: sec - 1 < 0 ? min - 1 : min,
				};
				document.title = `${newTime.min}:${
					newTime.sec < 10 ? `0${newTime.sec}` : newTime.sec
				} | ${this.state.originTitle}`;
				this.setState(newTime);
			}
		};
		this.setState({
			min: minute,
		});
		window.tomato = setInterval(cb, 1000);
	}
	playRingtone() {
		var sound = new Audio("/audio/alarm.mp3");
		if (!sound.paused) sound.pause();
		sound.currentTime = 0;
		sound.play();
	}
	endATomato = () => {
		const { statu, min, sec, originTitle } = this.state;
		// 含文本、标题和确认按钮回调
		statu === "working" &&
			min &&
			sec &&
			// @ts-expect-error ts-migrate(2339) FIXME: Property 'confirm' does not exist on type 'IMduiSt... Remove this comment to see the full error message
			mdui.confirm(
				"此次专注将无法保存",
				"确定要放弃这1/4个番茄吗？",
				() => {
					this.setState({
						statu: "sleep",
						min: 25,
						sec: 0,
					});
					clearInterval(window.tomato);
					document.title = originTitle;
				},
				() => {},
				{
					confirmText: "确定",
					cancelText: "不，自律使我自由！",
					history: false,
				}
			);
		if (statu === "rest") {
			this.setState(
				{
					statu: "sleep",
				},
				() => {
					this.startATomato();
				}
			);
		}
	};
	render() {
		const { min, sec, showHistory, title, statu } = this.state;
		return (
			<>
				<div className="center">
					<Input
						value={title}
						placeholder="给这颗番茄起个名字吧"
						onValueChange={(newText) => {
							this.setState({
								title: newText,
							});
						}}
					/>
					<br></br>
					<Tomato
						ang={((1500.1 - min * 60 - sec) / 1500) * 360}
						timeStr={`${min}:${sec < 10 ? `0${sec}` : sec}`}
						startWorking={() => {
							this.startATomato();
							this.setState({
								statu: "working",
							});
						}}
						addTime={() => {
							this.setState({
								min: min + 5,
							});
						}}
						statu={statu}
					/>
					<br></br>
					<button
						style={{
							display: statu !== "sleep" ? "block" : "none",
						}}
						onClick={this.endATomato}
						className="mdui-color-theme mdui-btn mdui-btn-raised"
					>
						{
							//@ts-expect-error
							{
								rest: "跳过休息",
								working: "重置",
							}[statu]
						}
					</button>
				</div>

				<button
					onClick={() => {
						this.setState({ showHistory: !showHistory });
					}}
					className="mdui-color-theme mdui-fab mdui-fab-mini mdui-fab-fixed"
				>
					<i className="mdui-icon material-icons">&#xe192;</i>
				</button>

				<BottomAlert
					title="记录"
					height={500}
					onClose={() => {
						this.setState({
							showHistory: false,
						});
					}}
					ifShow={showHistory}
				>
					<Record
						closeBottomAlert={() => {
							this.setState({ showHistory: false });
						}}
					/>
				</BottomAlert>
			</>
		);
	}
}
