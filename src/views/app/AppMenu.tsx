import React from "react";
// @ts-expect-error ts-migrate(2305) FIXME: Module '"mdui"' has no exported member 'prompt'.
import { snackbar, alert as mduiAlert } from "mdui";
import { Button, Input } from "mdui-in-react";
import fiv from "../../utils/Services/fiv";
import marked from "marked";
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
			showIframeCode: false,
			help: "",
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
		const { showIframeCode } = this.state;
		this.setState({
			showIframeCode: !showIframeCode,
		});
	};
	componentDidMount() {
		try {
			const helpMdPath = require(`../../apps/${this.props.appinfo.link}/README.md`);
			fetch(helpMdPath)
				.then((response) => {
					return response.text();
				})
				.then((text) => {
					this.setState({
						help: text,
					});
				});
		} finally {
		}
		this.props.appinfo.network &&
			!navigator.onLine &&
			mduiAlert("此工具需要联网才能使用", "", () => {}, {
				history: false,
			});
	}
	// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'nextProps' implicitly has an 'any' type... Remove this comment to see the full error message
	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.appinfo)
			this.setState({ fived: fiv.get(nextProps.appinfo.link) });
	}
	render() {
		const { fived, showIframeCode, help } = this.state;
		if (!this.props.appinfo) return null;
		const { link } = this.props.appinfo;
		return (
			<div className="mdui-p-a-1">
				<Button
					onClick={() => {
						this.fiv();
					}}
					icon={fived ? "star" : "star_border"}
				></Button>
				<ShareBtn />
				<Button icon="code" onClick={this.getIframeCode} />
				<a
					href={`https://github.com/RiverTwilight/ygktool/tree/master/src/apps/${link}`}
					target="_blank"
					rel="noopener noreferrer"
					className="mdui-btn mdui-btn-icon mdui-ripple"
					mdui-tooltip="{content: '在Github上编辑此页面'}"
				>
					<GithubLogo />
				</a>
				{showIframeCode && (
					<Input
						header="将以下嵌入代码粘贴到您的网页即可使用"
						rows={5}
						value={`<iframe src="${window.location.origin}/app/${link}?fullscreen=true" width="100%" height="400px" scrolling="no" style="border:0;"></iframe>`}
					/>
				)}
				<div className="mdui-divider"></div>
				{help !== "" && (
					<div
						style={{
							// Fix word-warp doesn't work
							whiteSpace: "normal",
						}}
						className="mdui-typo"
						dangerouslySetInnerHTML={{ __html: marked(help) }}
					/>
				)}
			</div>
		);
	}
}

export default AppMenu;
