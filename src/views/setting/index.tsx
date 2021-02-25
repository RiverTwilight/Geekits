import * as React from "react";
import { Link } from "react-router-dom";
import { ListControlMenu } from "mdui-in-react";
import StyledMarkdown from "../../components/StyledMarkdown";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import GroupIcon from "@material-ui/icons/Group";
import EmojiFoodBeverageIcon from "@material-ui/icons/EmojiFoodBeverage";
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
		donation: boolean;
	}
> {
	constructor(props: Readonly<{ handleNewPage: any }>) {
		super(props);
		this.state = {
			setting: setFunc(),
			privacy: "",
			showPrivacy: false,
			donation: false,
		};
	}
	componentDidMount() {
		// window.destoryRightDrawer();
		window.updateTitle("设置");
		fetch(PrivacyPath)
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
	showDonation = () => {
		this.setState({
			donation: true,
		});
	};
	handleClose = () => {
		this.setState({
			showPrivacy: false,
			donation: false,
		});
	};
	render() {
		const { hitokotoTopic, theme } = this.state.setting;
		const { showPrivacy, privacy, donation } = this.state;
		return (
			<>
				<Dialog
					onClose={this.handleClose}
					aria-labelledby="simple-dialog-title"
					open={showPrivacy}
				>
					<DialogTitle id="simple-dialog-title">隐私政策</DialogTitle>
					<StyledMarkdown content={privacy} />
				</Dialog>
				<Dialog
					onClose={this.handleClose}
					aria-labelledby="simple-dialog-title"
					open={donation}
				>
					<DialogTitle id="simple-dialog-title">
						支持我们走下去
					</DialogTitle>
					<img
						alt="DonationByScanning"
						width="200"
						height="200"
						src="/donation_vx.png"
					></img>
					<Typography variant="body1">
						目前网站只由我一人维护，
						需要付出昂贵的资金、精力和时间成本，
						而我只是一名在读高中生，没有任何收入来源。
						你的赞赏将会是我莫大的动力。
					</Typography>
				</Dialog>
				<List subheader={<ListSubheader>个性化</ListSubheader>}>
					<ListControlMenu
						title="一言来源"
						checked={hitokotoTopic || 0}
						onCheckedChange={(checked) => {
							this.setState({
								setting: setFunc("hitokotoTopic", checked),
							});
						}}
						items={hitokotoItems}
					/>
					<ListControlMenu
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
					/>
				</List>

				<List subheader={<ListSubheader>联系</ListSubheader>}>
					{[
						{
							text: "到Github提交反馈",
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

				<List subheader={<ListSubheader>关于</ListSubheader>}>
					{[
						{
							onClick: this.showPrivacy,
							text: "用户协议",
						},
						{
							onClick: this.showDonation,
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
				<Typography variant="body2" align="center">
					Copyright © 2019 - 2021 RiverTwilight
				</Typography>
			</>
		);
	}
}
