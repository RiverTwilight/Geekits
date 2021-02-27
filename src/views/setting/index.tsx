import * as React from "react";
import { Link } from "react-router-dom";
import StyledMarkdown from "../../components/StyledMarkdown";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import GroupIcon from "@material-ui/icons/Group";
import EmojiFoodBeverageIcon from "@material-ui/icons/EmojiFoodBeverage";
import PersonIcon from "@material-ui/icons/Person";
import AssistantIcon from "@material-ui/icons/Assistant";
import { blue } from "@material-ui/core/colors";

const PrivacyPath = require("./privacy.md");
// REBUILD 设置页面

interface ISetting {
	homeShowNewestTool: boolean;
	hitokotoTopic: number;
	theme: number;
}

function setFunc<T extends keyof ISetting>(name?: T, value?: any): ISetting {
	var originSetting: ISetting = JSON.parse(
		localStorage.getItem("setting") || "{}"
	);
	if (!name) return originSetting;
	originSetting[name] = value;
	localStorage.setItem("setting", JSON.stringify(originSetting));
	console.log(originSetting);
	return originSetting;
}

const hitokotoItems = [
	{
		name: "随机",
		value: "",
	},
	{
		name: "动漫",
		value: "a",
	},
	{
		name: "漫画",
		value: "b",
	},
	{
		name: "游戏",
		value: "c",
	},
	{
		name: "小说",
		value: "d",
	},
	{
		name: "原创",
		value: "e",
	},
	{
		name: "网络",
		value: "f",
	},
	{
		name: "其他",
		value: "g",
	},
];

export default class Setting extends React.Component<
	{ handleNewPage: any },
	{
		setting: ISetting;
		privacy: string;
		showPrivacy: boolean;
		showSaying: boolean;
		showDonation: boolean;
	}
> {
	constructor(props: Readonly<{ handleNewPage: any }>) {
		super(props);
		this.state = {
			setting: setFunc(),
			privacy: "",
			showPrivacy: false,
			showSaying: false,
			showDonation: false,
		};
	}
	componentDidMount() {
		window.updateTitle("设置");
		fetch(PrivacyPath.default)
			.then((response) => {
				return response.text();
			})
			.then((text) => {
				this.setState({
					privacy: text,
				});
			});
	}
	showPrivacy = () => {
		this.setState({
			showPrivacy: true,
		});
	};
	handleShowDonation = () => {
		this.setState({
			showDonation: true,
		});
	};
	handleShowSaying = () => {
		this.setState({
			showSaying: true,
		});
	};
	handleClose = () => {
		this.setState({
			showPrivacy: false,
			showDonation: false,
			showSaying: false,
		});
	};
	render() {
		const { hitokotoTopic, theme } = this.state.setting;
		const { showPrivacy, showSaying, privacy, showDonation } = this.state;
		return (
			<>
				<Dialog
					onClose={this.handleClose}
					aria-labelledby="simple-dialog-title"
					open={showPrivacy}
				>
					<DialogTitle id="simple-dialog-title">隐私政策</DialogTitle>
					<DialogContent>
						<StyledMarkdown content={privacy} />
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClose} color="primary">
							不同意
						</Button>
						<Button
							onClick={this.handleClose}
							color="primary"
							autoFocus
						>
							同意
						</Button>
					</DialogActions>
				</Dialog>
				<Dialog
					onClose={this.handleClose}
					aria-labelledby="simple-dialog-title"
					open={showDonation}
				>
					<DialogTitle id="simple-dialog-title">
						支持我们走下去
					</DialogTitle>
					<DialogContent>
						<Typography align="center" variant="body1">
							<img
								alt="DonationByScanning"
								width="200"
								height="200"
								src="/donation_vx.png"
							></img>
							<br />
							目前网站只由我一人维护，
							需要付出昂贵的资金、精力和时间成本，
							而我只是一名在读高中生，没有任何收入来源。
							你的帮助有助于我们更快迭代版本。
						</Typography>
					</DialogContent>
				</Dialog>
				<Dialog
					open={showSaying}
					aria-labelledby=""
					onClose={this.handleClose}
				>
					<DialogTitle>一言来源</DialogTitle>
					<DialogContent>
						<FormGroup>
							{hitokotoItems.map((item, i) => (
								<FormControlLabel
									control={
										<Checkbox
											checked={hitokotoTopic === i}
											onChange={() => {
												this.setState({
													setting: setFunc(
														"hitokotoTopic",
														i
													),
												});
											}}
											name="hitokotoTopic"
										/>
									}
									label={hitokotoItems[i].name}
								/>
							))}
						</FormGroup>
					</DialogContent>
				</Dialog>
				<List
					component={Paper}
					subheader={<ListSubheader>个性化</ListSubheader>}
				>
					<ListItem button onClick={this.handleShowSaying}>
						<ListItemIcon>
							<AssistantIcon />
						</ListItemIcon>
						<ListItemText
							primary="一言来源"
							secondary={hitokotoItems[hitokotoTopic].name}
						/>
					</ListItem>
					{/* <ListControlMenu
						title="主题"
						checked={theme || 0}
						onCheckedChange={(checked) => {
							this.setState({
								setting: setFunc("theme", checked),
							});
							const fn = [
								() => {
									window.location.reload();
								},
								() => {
									document.body.classList.remove(
										"mdui-theme-layout-dark"
									);
								},
								() => {
									document.body.classList.add(
										"mdui-theme-layout-dark"
									);
								},
							];
							fn[checked]();
						}}
						items={[
							{
								name: "跟随系统",
								value: "auto",
							},
							{
								name: "浅色模式",
								value: "light",
							},
							{
								name: "深色模式",
								value: "dark",
							},
						]}
					/> */}
				</List>
				<br />

				<List
					component={Paper}
					subheader={<ListSubheader>联系</ListSubheader>}
				>
					{[
						{
							text: "提交反馈",
							href:
								"https://github.com/RiverTwilight/ygktool/issues",
						},
						{
							text: "联系开发者",
							href:
								"//wpa.qq.com/msgrd?v=3&amp;uin=1985386335&amp;site=qq&amp;menu=yes",
						},
					].map((item) => (
						<ListItem button component="a" href={item.href}>
							<ListItemText primary={item.text} />
						</ListItem>
					))}
				</List>
				<br />
				<List
					component={Paper}
					subheader={<ListSubheader>关于</ListSubheader>}
				>
					{[
						{
							onClick: this.showPrivacy,
							text: "用户协议",
							Icon: <PersonIcon />,
						},
						{
							onClick: this.handleShowDonation,
							text: "捐赠",
							Icon: <EmojiFoodBeverageIcon />,
						},
						{
							onClick: () => {
								window.open("");
							},
							text: "加入群组",
							Icon: <GroupIcon />,
						},
					].map(({ Icon, onClick, text }) => (
						<ListItem button onClick={onClick}>
							{Icon && <ListItemIcon>{Icon}</ListItemIcon>}
							<ListItemText primary={text} />
						</ListItem>
					))}
				</List>
				<br />
				<Typography variant="body2" align="center">
					© 2019 - 2021 RiverTwilight
				</Typography>
			</>
		);
	}
}
