import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import LinearProgress from "@mui/material/LinearProgress";
import adaptiveBorder from "@/utils/adaptiveBorder";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AlarmIcon from "@mui/icons-material/Alarm";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import HistoryIcon from "@mui/icons-material/History";

const Graph = ({
	percent = 0.75,
}: {
	percent: number;
	status: string;
}): JSX.Element => {
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
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const clearHistory = () => {
		handleClose();
		localStorage.setItem("tomato", "[]");
		closeBottomAlert && closeBottomAlert();
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
			<Box p={2}>
				<Typography variant="body1">
					<b>今日：</b>
					{
						historyData.filter(
							(item: recordItem) =>
								item.metaDate === now.toLocaleDateString()
						).length
					}
				</Typography>
				<Typography variant="body1">
					<b>总计：</b>
					{historyData.length}
				</Typography>
				<Typography variant="body2" color="textSecondary">
					每个番茄完成后，你可以休息5分钟。每四个番茄完成后，你可以休息地更久一点。
				</Typography>
			</Box>
			<Divider />
			<List>
				{historyData.map((item: recordItem, i) => (
					<ListItem key={i}>
						<ListItemIcon>
							<AlarmIcon color="error" />
						</ListItemIcon>
						<ListItemText
							primary={item.name}
							secondary={item.date}
						/>
					</ListItem>
				))}
			</List>
			{historyData.length > 0 && (
				<Button
					variant="contained"
					color="secondary"
					onClick={handleClickOpen}
					fullWidth
				>
					清空记录
				</Button>
			)}
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">清除历史记录</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						此操作不可逆！确定要清除历史记录吗？
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						我手残了
					</Button>
					<Button onClick={clearHistory} color="primary" autoFocus>
						确定
					</Button>
				</DialogActions>
			</Dialog>
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
		isDrawerOpen: boolean;
		originTitle: string;
	}
> {
	constructor(props: {}) {
		super(props);
		this.state = {
			defaultSeconds: 25 * 60,
			restSeconds: 25 * 60,
			status: StatusSet.sleep,
			title: "",
			isDrawerOpen: false,
			originTitle: document.title,
		};
	}

	componentDidMount() {
		this.setState({ originTitle: document.title });
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

	toggleDrawer = (open: boolean) => {
		this.setState({ isDrawerOpen: open });
	};

	render() {
		const { restSeconds, defaultSeconds, title, status, isDrawerOpen } =
			this.state;
		return (
			<>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "start",
						alignItems: "center",
						height: "100vh",
					}}
				>
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							position: "relative",
							width: "300px",
							height: "300px",
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
								top: "50%",
								left: "50%",
								transform: "translate(-50%, -50%)",
							}}
						>
							<Typography
								sx={{
									fontFamily: `"Roboto","Helvetica","Arial",sans-serif`,
									fontVariantNumeric: "tabular-nums",
									fontWeight: 500,
								}}
								align="center"
								variant="h2"
							>
								{formatTime(restSeconds, true)}
							</Typography>
						</Box>
					</Box>

					<Box sx={{ mt: 4 }}>
						{status === StatusSet.sleep && (
							<RoundButton onClick={this.startATomato}>
								<PlayArrowIcon />
							</RoundButton>
						)}

						{status === StatusSet.work && (
							<RoundButton onClick={this.abandonTomato}>
								<DeleteIcon />
							</RoundButton>
						)}
					</Box>

					<Box sx={{ mt: 4 }}>
						<IconButton onClick={() => this.toggleDrawer(true)}>
							<HistoryIcon />
						</IconButton>
					</Box>
				</Box>

				<Drawer
					anchor="right"
					open={isDrawerOpen}
					onClose={() => this.toggleDrawer(false)}
				>
					<Box sx={{ width: 300 }}>
						<Record
							closeBottomAlert={() => this.toggleDrawer(false)}
						/>
					</Box>
				</Drawer>
			</>
		);
	}
}
