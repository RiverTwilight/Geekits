import React from "react";
// @ts-expect-error ts-migrate(2305) FIXME: Module '"mdui"' has no exported member 'confirm'.
import { confirm, snackbar } from "mdui";
import { Button } from "mdui-in-react";

//将一言添加到便签
const addSaying2Fiv = (saying: any) => {
	var content = `  <br>${saying.say}  ———来自 ${saying.from}`;
	var today = new Date();
	var newNote = {
		title: "一言收藏",
		content: content,
		tags: "a b c",
		date: today.toLocaleString(),
	};
	if (localStorage.note) {
		var notes = JSON.parse(localStorage.note);
		var hasNote = false;
		notes.map((note: any) => {
			if (note.title === "一言收藏") hasNote = true;
		});
		if (hasNote) {
			for (let i = 0; i <= notes.length; i++) {
				var note = notes[i];
				if (note && note.title === "一言收藏") {
					note.content += content;
					note.date = today.toLocaleString();
				}
			}
		} else {
			notes.push(newNote);
		}
	} else {
		notes = [newNote];
	}
	localStorage.setItem("note", JSON.stringify(notes));
};

type State = any;

class Header extends React.Component<
	{
		getRef(ref: any): void;
		openLoginDialog: any;
		title?: string;
	},
	State
> {
	headerTitle: any;
	menuBtn: any;
	constructor(props: any) {
		super(props);
		this.state = {
			searchResult: "",
			kwd: "", //用于传给结果组件的百度搜索,
			saying: {
				say: "我一路向北，离开有你的季节",
				from: "《头文字D》",
			},
		};
	}
	loadSaying() {
		const { hitokotoTopic = 0 } = JSON.parse(localStorage.setting || "{}");
		fetch(
			`https://api.ygktool.cn/api/hitokoto?topic=${
				"abcdefg"[hitokotoTopic]
			}`,
			{
				cache: "no-store",
			}
		)
			.then((res) => res.json())
			.then((json) => {
				this.setState({
					saying: {
						say: json.hitokoto,
						from: json.from,
					},
				});
			});
	}
	componentDidMount() {
		this.loadSaying();
		this.props.getRef([
			{ name: "title", ref: this.headerTitle },
			{ name: "menuBtn", ref: this.menuBtn },
		]); // 将ref传给父组件
	}
	render() {
		const { saying } = this.state;
		return (
			<header className={`mdui-shadow-0 mdui-appbar mdui-appbar-fixed`}>
				<div className="mdui-appbar mdui-shadow-0">
					<div className="mdui-toolbar mdui-color-white">
						<Button
							onClick={() => window.leftDrawer.toggle()}
							icon="menu"
						/>
						<a
							onClick={() => {
								confirm(
									`${saying.say}<br>来自：${saying.from}`,
									"一言",
									() => {
										addSaying2Fiv(saying);
										snackbar({
											message: "已收藏至便签",
											buttonText: "打开便签",
											onButtonClick: () => {
												window.location.href =
													"/app/note";
											},
										});
									},
									() => {
										this.loadSaying();
									},
									{
										history: false,
										confirmText: "收藏",
										cancelText: "刷新",
									}
								);
							}}
						>
							<div
								ref={(r) => (this.headerTitle = r)}
								className="mdui-typo-title header-width-saying"
							>
								{this.props.title || "云极客工具"}
							</div>
							<span className="mdui-typo-caption-opacity mdui-text-truncate saying">
								{saying.say}
							</span>
						</a>
						<div className="mdui-toolbar-spacer"></div>
						<button
							ref={(r) => (this.menuBtn = r)}
							style={{
								display: "none",
							}}
							onClick={() => {
								// @ts-expect-error ts-migrate(2339) FIXME: Property 'menu' does not exist on type 'Window & t... Remove this comment to see the full error message
								window.menu && window.menu();
							}}
							className="mdui-btn mdui-btn-icon mdui-text-color-theme"
						>
							<i className="mdui-icon material-icons">
								more_vert
							</i>
						</button>
					</div>
				</div>
				<div className="mdui-divider"></div>
			</header>
		);
	}
}

export default Header;
