import React from "react";
// @ts-expect-error ts-migrate(2305) FIXME: Module '"mdui"' has no exported member 'alert'.
import { alert as mduiAlert, mutation } from "mdui";
import getInfo from "../../utils/appinfo";
import AppMenu from "./AppMenu";
import loadable from "../../utils/loading";

/**
 * 中间件，来更新Dom(MDUI无脑特性)
 */
class MiddleWare extends React.Component<{}, any> {
	componentDidUpdate() {
		mutation();
	}
	render() {
		return <>{this.props.children}</>;
	}
}

/**
 * 工具加载框架
 * // TODO 文章板块
 */

class AppContainer extends React.Component<{}, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			appInfo: getInfo(props.match.params.name),
			FeedbackComp: null,
			showFeedbackComp: false,
			AppComp: null,
		};
	}
	componentDidCatch(error: any, info: any) {
		mduiAlert(error, "您的浏览器捕获到一个错误", null, {
			history: false,
		});
	}
	componentWillUnmount() {
		window.loadHide(); // 清除滚动条
		document.getElementsByClassName("mdui-overlay").length &&
			document.getElementsByClassName("mdui-overlay")[0].remove();
	}
	componentDidMount() {
		const { appInfo } = this.state;
		this.setState(
			{
				AppComp: loadable(() => import("../../apps/" + appInfo?.link)),
			},
			() => {
				appInfo && window.updateTitle(appInfo.name);
			}
		);
		// 链接带有全屏参数，隐藏头部
		if (window.location.search.indexOf("fullscreen=true") !== -1) {
			document.getElementsByTagName("header")[0].style.display = "none";
			document.body.classList.remove("mdui-appbar-with-toolbar");
		}
		window.setRightDrawer(
			<AppMenu feedback={this.feedback} appinfo={appInfo} />
		);
	}
	feedback = () => {
		let { FeedbackComp } = this.state;
		if (!FeedbackComp) {
			this.setState({
				FeedbackComp:
					!FeedbackComp &&
					loadable(() => import("../../layout/FeedbackComp")),
			});
		}
		this.setState({
			showFeedbackComp: true,
		});
	};
	render() {
		const { FeedbackComp, showFeedbackComp, AppComp } = this.state;
		return (
			<>
				{AppComp && (
					<MiddleWare>
						<AppComp />
					</MiddleWare>
				)}
				{FeedbackComp && (
					<FeedbackComp
						open={showFeedbackComp}
						onClose={() => {
							this.setState({
								showFeedbackComp: false,
							});
						}}
					/>
				)}
			</>
		);
	}
}

export default AppContainer;
