/* eslint-disable react/prop-types */
import React from "react";
// @ts-expect-error ts-migrate(2305) FIXME: Module '"mdui"' has no exported member 'prompt'.
import { snackbar, prompt, alert as mduiAlert } from "mdui";
import { BottomAlert } from "mdui-in-react";
import fiv from "../../utils/Services/fiv";

const ShareBtn = () => {
	if (navigator.share) {
		return (
			<button
				onClick={() => {
					navigator
						.share({
							// @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type 'Location'... Remove this comment to see the full error message
							title: window.location.title,
							url: window.location.href,
						})
						.then(() => {
							snackbar({ message: "感谢分享^_^" });
						});
				}}
				mdui-tooltip="{content: '分享'}"
				className="mdui-btn mdui-btn-icon mdui-ripple"
			>
				<i className="mdui-text-color-theme mdui-icon material-icons">
					share
				</i>
			</button>
		);
	}
	return null;
};

// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'cb' implicitly has an 'any' type.
const GetCodeBtn = ({ cb }) => (
	<button
		onClick={cb}
		mdui-tooltip="{content: '获取代码'}"
		className="mdui-btn mdui-btn-icon mdui-ripple"
	>
		<i className="mdui-text-color-theme mdui-icon material-icons">code</i>
	</button>
);

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
	componentDidMount() {
		this.props.appinfo.network &&
			!navigator.onLine &&
			mduiAlert("此工具需要联网才能使用", "", () => {}, {
				history: false,
			});
		window.globalRef.menuBtn.style.display = "block";
		// @ts-expect-error ts-migrate(2339) FIXME: Property 'menu' does not exist on type 'Window & t... Remove this comment to see the full error message
		window.menu = () => {
			this.setState({
				showHelper: true,
			});
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
		const { fived, showHelper } = this.state;
		if (!this.props.appinfo) return null;
		const { help, link } = this.props.appinfo;
		return (
			<BottomAlert
				title="菜单"
				ifShow={window.innerWidth <= 640 ? showHelper : true}
				onClose={() => {
					this.setState({ showHelper: false });
				}}
			>
				<p className="mdui-typo mdui-p-a-2">
					{help !== "" ? help : "暂无说明"}
				</p>

				<div className="mdui-card-actions">
					<button
						onClick={() => {
							this.fiv();
						}}
						mdui-tooltip={
							fived
								? "{content: '取消收藏'}"
								: "{content: '收藏'}"
						}
						className="mdui-btn mdui-btn-icon mdui-ripple"
					>
						<i className="mdui-text-color-theme mdui-icon material-icons">
							{fived ? "star" : "star_border"}
						</i>
					</button>

					<ShareBtn />

					<GetCodeBtn
						cb={() => {
							this.setState({ showHelper: false }, () => {
								prompt(
									"将以下嵌入代码粘贴到您的网页即可使用。欲获取应用源代码，请加群联系开发者",
									() => {
										window.open(
											"https://jq.qq.com/?_wv=1027&k=59hWPFs"
										);
									},
									() => {},
									{
										history: false,
										type: "textarea",
										confirmText: "加群",
										cancelText: "关闭",
										defaultValue: `<iframe src="https://www.ygktool.cn/app/${link}?fullscreen=true" width="100%" height="400px" scrolling="no" style="border:0;"></iframe>`,
									}
								);
							});
						}}
					/>

					<a
						href="https://jq.qq.com/?_wv=1027&amp;k=59hWPFs"
						target="_blank"
						rel="noopener noreferrer"
						mdui-tooltip="{content: '获取帮助'}"
						className="mdui-btn mdui-btn-icon mdui-ripple"
					>
						<i className="mdui-text-color-theme mdui-icon material-icons">
							help
						</i>
					</a>
				</div>
			</BottomAlert>
		);
	}
}

export default AppMenu;
