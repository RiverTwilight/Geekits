import React from "react";
import getInfo from "../../utils/appinfo";
import AppMenu from "./AppMenu";
import Loadable from "react-loadable";
import RightDrawer from "../../layout/RightDrawer";
import HelpTwoToneIcon from "@material-ui/icons/HelpTwoTone";
import IconButton from "@material-ui/core/IconButton";

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
			RightDrawerOpen: false,
		};
	}
	componentWillUnmount() {
		// window.loadHide(); // 清除滚动条
	}
	componentDidCatch(error: any, info: any) {
		// REBUILD Error Bounding
		// mduiAlert(error, "您的浏览器捕获到一个错误", null, {
		// 	history: false,
		// });
	}
	componentDidMount() {
		const { appInfo } = this.state;

		appInfo && window.updateTitle(appInfo.name);
		window.setHeaderButton(
			<IconButton
				color="primary"
				aria-label="open drawer"
				onClick={() => {
					this.setState({
						RightDrawerOpen: true,
					});
				}}
				edge="start"
			>
				<HelpTwoToneIcon />
			</IconButton>
		);
		// 链接带有全屏参数，隐藏头部
		if (window.location.search.indexOf("fullscreen=true") !== -1) {
			// document.getElementsByTagName("header")[0].style.display = "none";
			// document.body.classList.remove("mdui-appbar-with-toolbar");
		}
	}
	feedback = () => {
		let { FeedbackComp } = this.state;
		if (!FeedbackComp) {
			this.setState({
				FeedbackComp:
					!FeedbackComp &&
					//@ts-expect-error
					Loadable({
						loader: () => import("../../layout/FeedbackComp"),
					}),
			});
		}
		this.setState({
			showFeedbackComp: true,
		});
	};
	render() {
		const {
			FeedbackComp,
			showFeedbackComp,
			appInfo,
			RightDrawerOpen,
		} = this.state;
		const AppComp = Loadable({
			loader: () => import("../../apps/" + appInfo?.link),
			loading: () => <>asdf</>,
		});
		return (
			<>
				<AppComp />
				<RightDrawer
					onClose={() => {
						this.setState({
							RightDrawerOpen: false,
						});
					}}
					open={RightDrawerOpen}
				>
					<AppMenu feedback={this.feedback} appinfo={appInfo} />
				</RightDrawer>
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
