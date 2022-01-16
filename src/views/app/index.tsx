import React from "react";
// @ts-expect-error ts-migrate(2305) FIXME: Module '"mdui"' has no exported member 'alert'.
import { alert as mduiAlert, mutation } from "mdui";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import loadable from "../../utils/loading";
import getInfo from "../../utils/appinfo";
import AppMenu from "./AppMenu";

/**
 * 工具加载框架
 * // TODO 快捷反馈
 */

class AppContainer extends React.Component<
	{},
	{
		appInfo: any;
		newDomainAlert: boolean;
	}
> {
	constructor(props: any) {
		super(props);
		this.state = {
			appInfo: getInfo(props.match.params.name),
			newDomainAlert: true
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
		setInterval(() => mutation(), 100);
		// 链接带有全屏参数，隐藏头部
		if (window.location.search.indexOf("fullscreen=true") !== -1) {
			document.getElementsByTagName("header")[0].style.display = "none";
			document.body.classList.remove("mdui-appbar-with-toolbar");
		}
		window.setRightDrawer(<AppMenu appinfo={appInfo} />);
		let read = localStorage.getItem("READ_NEW_DOMAIN_ALERT");
		if (read == "1") {
			this.setState({
				newDomainAlert: false
			})
		}
	}
	doNotShowAgain() {
		this.setState({
			newDomainAlert: false
		})
		localStorage.setItem("READ_NEW_DOMAIN_ALERT", "1");
	}
	render() {
		const { appInfo, newDomainAlert } = this.state;
		return (
			<>
				{newDomainAlert && <div className="mdui-p-a-2 mdui-card">网站域名已迁移至YgkTool.COM，请您知悉!   <span onClick={this.doNotShowAgain.bind(this)} className="mdui-text-color-theme">不再提示</span></div>}
				<Router>
					<Route
						path="/app/:name"
						component={loadable(() => {
							appInfo && window.updateTitle(appInfo.name);
							return import("../../apps/" + appInfo?.link);
						})}
					></Route>
				</Router>
			</>
		);
	}
}

// @ts-expect-error ts-migrate(2345) FIXME: Type 'Readonly<{}> & Readonly<{ children?: ReactNo... Remove this comment to see the full error message
export default withRouter(AppContainer);
