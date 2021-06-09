import React from "react";
import getInfo from "../../utils/appinfo";
import AppMenu from "./AppMenu";
import Loadable from "../../utils/loading";
import RightDrawer from "../../components/RightDrawer";
import HelpTwoToneIcon from "@material-ui/icons/HelpTwoTone";
import IconButton from "@material-ui/core/IconButton";
import {
	makeStyles,
	useTheme,
	withStyles,
	Theme,
	createStyles,
} from "@material-ui/core/styles";
import clsx from "clsx";

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
			appInfo: getInfo(props.match.params.name),
			FeedbackComp: null,
			showFeedbackComp: false,
			RightDrawerOpen: true,
		};
	}
	componentWillUnmount() {
		window.loadHide(); // 清除滚动条
	}
	componentDidCatch(error: any, info: any) {
		// REBUILD Error Bounding
		// mduiAlert(error, "您的浏览器捕获到一个错误", null, {
		// 	history: false,
		// });
	}
	componentDidMount() {
		const { appInfo, RightDrawerOpen } = this.state;
		appInfo && window.updateTitle(appInfo.name);
		// TODO 独立管理工具菜单打开状态
		window.setHeaderButton(
			<IconButton
				color="primary"
				aria-label="open drawer"
				onClick={() => {
					this.setState({
						RightDrawerOpen: !this.state.RightDrawerOpen,
					});
				}}
				edge="start"
			>
				<HelpTwoToneIcon />
			</IconButton>
		);
		// REBUILD 链接带有全屏参数，隐藏头部
		if (window.location.search.indexOf("fullscreen=true") !== -1) {
			// document.getElementsByTagName("header")[0].style.display = "none";
			// document.body.classList.remove("mdui-appbar-with-toolbar");
		}
	}
	feedback = () => {
		// TODO 反馈直接提交到github issue
		let { FeedbackComp } = this.state;
		if (!FeedbackComp) {
			this.setState({
				FeedbackComp:
					!FeedbackComp &&
					Loadable(() => import("../../components/FeedbackComp")),
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
		const { classes } = this.props;

		const AppComp = Loadable(() => import("../../apps/" + appInfo?.link));
		return (
			<>
				<div
					className={clsx(classes.content, {
						[classes.contentShift]: RightDrawerOpen,
					})}
				>
					<AppComp />
				</div>

				<RightDrawer
					onClose={() => {
						this.setState({
							RightDrawerOpen: !RightDrawerOpen,
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

export default withStyles(styles)(AppContainer);
