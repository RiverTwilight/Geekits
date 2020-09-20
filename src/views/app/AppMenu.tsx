/* eslint-disable react/prop-types */
import React from "react";
// @ts-expect-error ts-migrate(2305) FIXME: Module '"mdui"' has no exported member 'prompt'.
import { snackbar, Drawer, prompt, alert as mduiAlert } from "mdui";
import { Button } from "mdui-in-react";
import fiv from "../../utils/Services/fiv";
import { ReactComponent as GithubLogo } from "../../svg/logo-github.svg";

const ShareBtn = () => {
	if (navigator.share) {
		return (
			<Button
				onClick={() => {
					navigator
						.share({
							title: document.title,
							url: window.location.href,
						})
						.then(() => {
							snackbar({ message: "感谢分享^_^" });
						});
				}}
				mdui-tooltip="{content: '分享'}"
				icon="share"
			></Button>
		);
	}
	return null;
};

type AppMenuState = any;

/**
 * 工具菜单
 */

class AppMenu extends React.Component<
	{
		appinfo: any;
	},
	AppMenuState
> {
	constructor(props: Readonly<{ appinfo: any }>) {
		super(props);
		this.state = {
			fived: fiv.get(this.props.appinfo.link),
			showHelper: false,
		};
	}
	fiv() {
		const { link, name } = this.props.appinfo;
		if (!fiv.get(link)) {
			fiv.add({
				link: link,
				name: name,
			});
			this.setState({ fived: true });
		} else {
			fiv.delete({
				link: link,
				name: name,
			});
			this.setState({ fived: false });
		}
	}
	getIframeCode = () => {
		const { appinfo } = this.props;
		this.setState({ showHelper: false }, () => {
			prompt(
				"将以下嵌入代码粘贴到您的网页即可使用",
				() => {
					// window.open("https://jq.qq.com/?_wv=1027&k=59hWPFs");
					window.open("https://github.com/RiverTwilight/ygktool");
				},
				() => {},
				{
					history: false,
					type: "textarea",
					confirmText: "开放源代码",
					cancelText: "关闭",
					defaultValue: `<iframe src="${window.location.origin}/app/${appinfo.link}?fullscreen=true" width="100%" height="400px" scrolling="no" style="border:0;"></iframe>`,
				}
			);
		});
	};
	componentDidMount() {
		window.appMenu = new Drawer("#appMenu");
		this.props.appinfo.network &&
			!navigator.onLine &&
			mduiAlert("此工具需要联网才能使用", "", () => {}, {
				history: false,
			});
		window.globalRef.menuBtn.style.display = "block";
		// @ts-expect-error ts-migrate(2339) FIXME: Property 'menu' does not exist on type 'Window & t... Remove this comment to see the full error message
		window.menu = () => {
			window.appMenu.toggle();
		};
	}
	componentWillUnmount() {
		window.globalRef.menuBtn.style.display = "none";
	}
	// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'nextProps' implicitly has an 'any' type... Remove this comment to see the full error message
	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.appinfo)
			this.setState({ fived: fiv.get(nextProps.appinfo.link) });
	}
	render() {
		const { fived } = this.state;
		if (!this.props.appinfo) return null;
		const { help, link } = this.props.appinfo;
		return (
			<div
				id="appMenu"
				className="mdui-p-a-1 mdui-drawer mdui-drawer-right"
			>
				<Button
					onClick={() => {
						this.fiv();
					}}
					raised
					icon={fived ? "star" : "star_border"}
					title={fived ? "取消收藏" : "收藏"}
				></Button>
				<ShareBtn />
				<Button
					icon="code"
					raised
					title="嵌入代码"
					onClick={this.getIframeCode}
				/>
				<div className="mdui-clearfix"></div>
				{help !== "" && (
					<p
						style={{
							// Fix word-warp doesn't work
							whiteSpace: "normal",
						}}
						className="mdui-typo"
					>
						{help}
					</p>
				)}
				<a
					href={`https://github.com/RiverTwilight/ygktool/tree/master/src/apps/${link}`}
					target="_blank"
					rel="noopener noreferrer"
					className="mdui-btn mdui-ripple"
				>
					<i
						style={{
							transform: "translate(2px, -2px);",
						}}
						className="mdui-text-color-theme mdui-icon-left mdui-icon material-icons"
					>
						<GithubLogo />
					</i>
					在github上编辑此页面
				</a>
			</div>
		);
	}
}

export default AppMenu;
