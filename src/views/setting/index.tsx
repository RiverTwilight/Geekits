import * as React from "react";
import { Link } from "react-router-dom";
//@ts-expect-error
import { alert as mduiAlert } from "mdui";
import { ListControlMenu, List } from "mdui-in-react";
import marked from "marked";
const PrivacyPath = require("./privacy.md");

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
	{ setting: ISetting; privacy: string }
> {
	constructor(props: Readonly<{ handleNewPage: any }>) {
		super(props);
		this.state = {
			setting: setFunc(),
			privacy: "",
		};
	}
	componentDidMount() {
		window.destoryRightDrawer();
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
		const { privacy } = this.state;
		mduiAlert(marked(privacy), "", () => {}, {
			confirmText: "关闭",
		});
	};
	render() {
		const { hitokotoTopic, theme } = this.state.setting;
		return (
			<div className="mdui-col-md-10">
				<ul className="mdui-list">
					<li className="mdui-text-color-theme mdui-subheader">
						个性化
					</li>
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
					<li className="mdui-text-color-theme mdui-subheader">
						联系
					</li>

					<List
						items={[
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
						]}
					/>
					<li className="mdui-text-color-theme mdui-subheader">
						关于
					</li>
					<List
						items={[
							{
								onClick: this.showPrivacy,
								text: "用户协议",
							},
						]}
					/>
					<Link to="/about">
						<List
							items={[
								{
									text: "关于",
								},
							]}
						/>
					</Link>
				</ul>
			</div>
		);
	}
}
