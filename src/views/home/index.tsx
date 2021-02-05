import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
// @ts-expect-error ts-migrate(2305) FIXME: Module '"mdui"' has no exported member 'alert'.
import { alert as mduiAlert, mutation } from "mdui";
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/js-pinyin` if it exists or... Remove this comment to see the full error message
import pinyin from "js-pinyin";
import { ToTop } from "mdui-in-react";
import applist from "../../data/appData";
import fiv from "../../utils/Services/fiv";
import useEventListener from "../../utils/Hooks/useEventListener";
import marked from "marked";

const AppListItem = ({
	isActive,
	channel,
	icon,
	icon_color,
	name,
	link,
	description,
}: any) => {
	return channel === 5 ? (
		<>
			<a
				className={`${
					isActive && "mdui-list-item-active"
				} mdui-col mdui-list-item mdui-ripple`}
				target="_blank"
				rel="noopener noreferrer"
				href={link}
			>
				<i
					className={
						"mdui-list-item-icon mdui-icon material-icons mdui-text-color-grey"
					}
				>
					link
				</i>

				<div className="mdui-list-item-content">
					<div className="mdui-list-item-title">{name}</div>
				</div>
			</a>
		</>
	) : (
		<>
			<Link
				to={"/app/" + link}
				className={`${
					isActive && "mdui-list-item-active"
				} mdui-col mdui-list-item mdui-ripple`}
			>
				<i
					className={
						"mdui-list-item-icon mdui-icon material-icons mdui-text-color-" +
						icon_color
					}
				>
					{icon}
				</i>

				<div className="mdui-list-item-content">
					<div className="mdui-list-item-title">{name}</div>
					{description && (
						<div className="mdui-list-item-text">{description}</div>
					)}
				</div>
			</Link>

			<li className="mdui-hidden-md-up mdui-divider-inset mdui-m-y-0"></li>
		</>
	);
};

/**
 * 收藏列表
 * */
const FivList = () => {
	const [edit, setEdit] = useState(false);
	const [list, ,] = useState(fiv.getAll());
	return (
		<ul className="mdui-row-md-3 mdui-list">
			<li className="mdui-subheader">
				收藏&nbsp;
				<span
					onClick={() => {
						setEdit(!edit);
					}}
					style={{
						display: list.length > 0 ? "block" : "none",
					}}
					className="mdui-text-color-theme mdui-float-right"
				>
					{edit ? "保存" : "编辑"}
				</span>
			</li>
			{!list.length ? (
				<div className="mdui-text-center mdui-typo-body-1-opacity">
					点击工具菜单中的星型按钮收藏
				</div>
			) : (
				list.map((a, i) => (
					<Link
						key={a.link + a.icon}
						to={edit ? "#" : "/app/" + a.link}
						// @ts-expect-error ts-migrate(2322) FIXME: Property 'disabled' does not exist on type 'Intrin... Remove this comment to see the full error message
						disabled={edit}
						className="mdui-col mdui-list-item mdui-ripple"
					>
						<i className="mdui-list-item-icon mdui-icon material-icons">
							star_border
						</i>

						<div className="mdui-list-item-content">{a.name}</div>
						{edit && (
							<button
								onClick={() => fiv.delete(i)}
								className="mdui-btn mdui-list-item-icon mdui-btn-icon"
							>
								<i className="mdui-icon material-icons mdui-text-color-red">
									delete
								</i>
							</button>
						)}
					</Link>
				))
			)}
		</ul>
	);
};

/**
 * 搜索结果
 */
const SearchResult = ({ result = [], kwd }: any) => {
	const handleKeydown = (e: any) => {
		if (e.keyCode === 38 || e.keyCode === 40) {
			e.preventDefault();
			setActiveItem(e.keyCode === 38 ? activeItem - 1 : activeItem + 1);
		} else if (e.keyCode === 13) {
			e.preventDefault();
			handleClick(`/app/${result[activeItem].link}`);
		}
	};
	const [activeItem, setActiveItem] = useState(-1);
	useEventListener("keydown", handleKeydown);
	let history = useHistory();
	if (!result.length && kwd === "") return null;
	function handleClick(url: any) {
		history.push(url);
	}
	return (
		<ul className="mdui-list">
			{/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'a' implicitly has an 'any' type. */}
			{result.map((a, i) => (
				<AppListItem
					isActive={activeItem === i}
					key={a.link + a.icon}
					{...a}
				/>
			))}
			<p className="mdui-typo mdui-text-center">
				没找到想要的工具?试试
				<a href={"https://www.google.com/search?q=" + kwd}>谷歌搜索</a>
			</p>
			<div className="mdui-divider"></div>
		</ul>
	);
};

type SearchState = any;

class Search extends React.Component<{}, SearchState> {
	searchInput: any;
	constructor(props: {}) {
		super(props);
		this.state = {
			kwd: "",
			searchResult: [],
		};
	}
	handleSearchKeydown(e: any) {
		if (e.ctrlKey && e.keyCode === 70) {
			e.preventDefault();
			this.searchInput && this.searchInput.focus();
		}
	}
	componentDidMount() {
		pinyin.setOptions({ checkPolyphone: false, charCase: 0 });
		document.addEventListener(
			"keydown",
			this.handleSearchKeydown.bind(this)
		);
	}
	componentWillUnmount() {
		document.removeEventListener(
			"keydown",
			this.handleSearchKeydown.bind(this)
		);
	}
	handleInput = (e: { target: { value: any } }) => {
		const {
			target: { value },
		} = e;
		this.setState({ kwd: value }, () => {
			this.search();
		});
	};
	search() {
		const { kwd } = this.state;
		const res = applist.filter((app) => {
			let keyword = kwd.toLowerCase().trim();
			return (
				(pinyin
					.getFullChars(app.name)
					.toLowerCase()
					.indexOf(keyword) !== -1 ||
					app.name.toLowerCase().indexOf(keyword) !== -1) &&
				kwd !== ""
			);
		});
		this.setState({
			searchResult: res,
		});
	}
	render() {
		const { kwd, searchResult } = this.state;
		return (
			<>
				<div className="mdui-textfield">
					<i className="mdui-icon material-icons">search</i>
					<input
						ref={(r) => (this.searchInput = r)}
						onChange={this.handleInput}
						value={this.state.kwd}
						className="mdui-textfield-input"
						placeholder="搜索(ctrl+F)"
					></input>
				</div>
				<SearchResult kwd={kwd} result={searchResult} />
			</>
		);
	}
}

//分类栏目
const MakeChannels = ({ data: { name, apps, icon } }: any) => (
	<>
		<li className="mdui-collapse-item mdui-collapse-item-open">
			<div className="mdui-collapse-item-header mdui-list-item mdui-ripple">
				<i className="mdui-list-item-icon mdui-icon material-icons">
					{icon}
				</i>
				<div className="mdui-list-item-content">{name}</div>
				<i className="mdui-collapse-item-arrow mdui-icon material-icons">
					keyboard_arrow_down
				</i>
			</div>
			<ul className="mdui-collapse-item-body mdui-row-md-2 mdui-list">
				{apps.map((app: any) => (
					<AppListItem key={app.name} {...app} />
				))}
			</ul>
		</li>
	</>
);

const getChannelName = (index: any) => {
	const channels = [
		"AI人工智能",
		"图片视频",
		"编程开发",
		"生活常用",
		"第三方工具&友情链接",
	];
	return channels[index - 1];
};

const getChannelIcon = (index: any) => {
	const icons = ["brightness_auto", "photo", "code", "brightness_7", "link"];
	return icons[index - 1];
};

class AppList extends React.Component {
	componentDidMount() {
		mutation();
	}
	render() {
		var channelType: any = [];
		for (let i = applist.length - 1; i >= 0; i--) {
			let app = applist[i];
			if (!channelType.includes(app.channel)) {
				channelType.unshift(app.channel);
			}
		}

		// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'channel' implicitly has an 'any' type.
		var data = channelType.map((channel) => ({
			name: getChannelName(channel),
			icon: getChannelIcon(channel),
			apps: applist.filter((app) => app.channel === channel),
		}));

		/**
		 * accordion 是否启用手风琴效果。
		 * 为 true 时，最多只能有一个内容块处于打开状态，打开一个内容块时会关闭其他内容块。
		 * 为 false 时，可同时打开多个内容块。
		 */
		return (
			<ul className="mdui-list" mdui-collapse="{accordion: true}">
				<li className="mdui-subheader">所有工具</li>
				{data.map((a: any, i: any) => (
					<MakeChannels key={i} data={a} />
				))}
			</ul>
		);
	}
}

type IndexState = any;

export default class Index extends React.Component<{}, IndexState> {
	// showNotice() {
	// 	const {
	// 		notice: { date, content, id },
	// 	} = this.state;
	// 	mduiAlert(
	// 		content,
	// 		date.split("T")[0] + "公告",
	// 		() => {
	// 			localStorage.setItem("readedNotice", id);
	// 		},
	// 		{
	// 			confirmText: "我知道了",
	// 			history: false,
	// 		}
	// 	);
	// }
	componentDidMount() {
		this.getNotice();
		window.updateTitle();
	}
	getNotice() {
		//if(sessionStorage.loadedNotice == 1)return
		// const helpMdPath = require(`../../data/notice.md`);
		const helpMdPath = `https://api.github.com/repos/RiverTwilight/ygktool/issues/7`;
		fetch(helpMdPath, {
			headers: new Headers({
				Accept: "application/vnd.github.squirrel-girl-preview",
			}),
		})
			.then((response) => {
				return response.text()
			})
			.then((text) => {
				const notice = {
					content: marked(JSON.parse(text).body),
				};
				window.setRightDrawer(
					<div className="mdui-typo mdui-p-a-1">
						<div
							style={{
								// Fix word-warp doesn't work
								whiteSpace: "normal",
							}}
							dangerouslySetInnerHTML={{
								__html: notice ? notice.content : "没有公告",
							}}
						></div>
					</div>
				);
				// sessionStorage.setItem('loadedNotice', 1)
				// if (
				// 	window.innerWidth <= 640 &&
				// 	(!localStorage.readedNotice ||
				// 		parseInt(localStorage.readedNotice) !== primary)
				// )
				// 	this.showNotice();
			});
	}
	render() {
		return (
			<>
				<Search />
				<FivList />
				<AppList />
				{/* <ToTop /> */}
			</>
		);
	}
}
