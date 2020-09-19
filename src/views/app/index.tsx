import React from "react";
// @ts-expect-error ts-migrate(2305) FIXME: Module '"mdui"' has no exported member 'alert'.
import { alert as mduiAlert, mutation } from "mdui";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import loadable from "../../utils/loading";
import getInfo from "../../utils/appinfo";
import AppMenu from "./AppMenu";

/**
 * 工具加载框架
 */

class AppContainer extends React.Component {
	constructor(props: any) {
		super(props);
	}
	componentDidCatch(error: any, info: any) {
		mduiAlert(error, "您的浏览器捕获到一个错误", null, {
			history: false,
		});
	}
	componentWillUnmount() {
		window.loadHide(); // 清除滚动条
		window.appMenu.close();
		document.getElementsByClassName("mdui-overlay").length &&
			document.getElementsByClassName("mdui-overlay")[0].remove();
		window.globalRef.menuBtn.style.display = "none";
	}
	componentDidMount() {
		setInterval(() => mutation(), 100);
		// 链接带有全屏参数，隐藏头部
		if (window.location.search.indexOf("fullscreen=true") !== -1) {
			document.getElementsByTagName("header")[0].style.display = "none";
			document.body.classList.remove("mdui-appbar-with-toolbar");
		}
		document.body.classList.add("mdui-drawer-body-right");
		window.globalRef.menuBtn.style.display = "block";
	}
	render() {
		// @ts-expect-error ts-migrate(2339) FIXME: Property 'match' does not exist on type 'Readonly<... Remove this comment to see the full error message
		const appInfo = getInfo(this.props.match.params.name);
		return (
			<>
				<Router>
					<Route
						path="/app/:name"
						component={loadable(() => {
							appInfo && window.updateTitle(appInfo.name);
							return import("../../apps/" + appInfo?.link);
						})}
					></Route>
					<AppMenu appinfo={appInfo} />
				</Router>
			</>
		);
	}
}

// @ts-expect-error ts-migrate(2345) FIXME: Type 'Readonly<{}> & Readonly<{ children?: ReactNo... Remove this comment to see the full error message
export default withRouter(AppContainer);
