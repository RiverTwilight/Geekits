import React from "react";
import IconButton from "@material-ui/core/IconButton";
import RightDrawer from "../../components/RightDrawer";
import AppMenu from "../../components/AppMenu";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import HelpTwoToneIcon from "@material-ui/icons/HelpTwoTone";
import getAppInfo from "../../utils/appinfo";
import getPaths from "../../utils/getPaths";
import getPostId from "../../utils/getPostId";
import appImportList from "../../data/appImportList";

export async function getStaticPaths({ locale }) {
	return {
		paths: getPaths(locale, getPostId, "apps/**/index.tsx"),
		fallback: false,
	};
}

export async function getStaticProps({ locale, locales, ...ctx }) {
	const { id: currentId } = ctx.params;

	const appData = require("../../data/i18n/" +
		locale +
		"/appData.js");

	const appInfo = getAppInfo(appData, currentId);

	console.log(appInfo);

	const appDoc = require("../../apps/" +
		appInfo.link +
		"/README." +
		locale +
		".md").default;

	return {
		props: {
			currentPage: {
				title: appInfo.name,
				path: "/app/" + appInfo.link,
				description: appInfo.description || "",
			},
			locale,
			appInfo: {
				link: appInfo.link,
				name: appInfo.name,
			},
			appDoc,
		},
	};
}

const drawerWidth = 260;

const styles = (theme: Theme) =>
	createStyles({
		content: {
			position: "relative",
			minHeight: "100%",
			flexGrow: 1,
			padding: theme.spacing(1),
			transition: theme.transitions.create("margin", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			marginRight: 0,
		},
		contentShift: {
			[theme.breakpoints.up("sm")]: {
				transition: theme.transitions.create("margin", {
					easing: theme.transitions.easing.easeOut,
					duration: theme.transitions.duration.enteringScreen,
				}),
				marginRight: drawerWidth,
			},
		},
	});
/**
 * 工具加载框架
 * // TODO 文章板块
 */

class AppContainer extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			AppComp: null,
			FeedbackComp: null,
			showFeedbackComp: false,
			RightDrawerOpen: true,
		};
	}
	componentWillUnmount() {
		window.loadHide(); // 清除滚动条
	}
	componentDidCatch(error: any, info: any) {
		window.snackbar({
			message: "您的浏览器捕捉到一个错误：" + error,
		});
	}
	componentDidMount() {
		const { RightDrawerOpen } = this.state;
		const { setAction, appInfo } = this.props;

		this.setState({
			AppComp: appImportList[appInfo.link],
		});

		// TODO 独立管理工具菜单打开状态

		setAction(() => {
			return (
				<IconButton
					color="primary"
					aria-label="open drawer"
					onClick={() => {
						this.setState({
							RightDrawerOpen: !RightDrawerOpen,
						});
					}}
					edge="start"
				>
					<HelpTwoToneIcon />
				</IconButton>
			);
		});

		// TODO 链接带有全屏参数，隐藏头部
		if (window.location.search.indexOf("fullscreen=true") !== -1) {
			// document.getElementsByTagName("header")[0].style.display = "none";
			// document.body.classList.remove("mdui-appbar-with-toolbar");
		}
	}
	feedback = () => {
		let { FeedbackComp } = this.state;
		if (!FeedbackComp) {
			// this.setState({
			// 	FeedbackComp:
			// 		!FeedbackComp &&
			// 		Loadable(() => import("../../components/FeedbackComp")),
			// });
		}
		this.setState({
			showFeedbackComp: true,
		});
	};
	render() {
		const { AppComp, FeedbackComp, showFeedbackComp, RightDrawerOpen } =
			this.state;
		const { appInfo, appDoc, classes } = this.props;

		return (
			<>
				<div
					className={clsx(classes.content, {
						[classes.contentShift]: RightDrawerOpen,
					})}
				>
					{AppComp && <AppComp />}
				</div>

				<RightDrawer
					onClose={() => {
						this.setState({
							RightDrawerOpen: !RightDrawerOpen,
						});
					}}
					open={RightDrawerOpen}
				>
					<AppMenu
						appDoc={appDoc}
						feedback={this.feedback}
						appinfo={appInfo}
					/>
				</RightDrawer>

				{/* {FeedbackComp && (
					<FeedbackComp
						open={showFeedbackComp}
						onClose={() => {
							this.setState({
								showFeedbackComp: false,
							});
						}}
					/>
				)} */}
			</>
		);
	}
}

export default withStyles(styles)(AppContainer);
