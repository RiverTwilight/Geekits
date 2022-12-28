import React from "react";
import AppMenu from "@/components/AppMenu";
import RightDrawer from "@/components/RightDrawer";
import createStyles from "@mui/styles/createStyles";
import withStyles from "@mui/styles/withStyles";
import HelpTwoToneIcon from "@mui/icons-material/HelpTwoTone";
import IconButton from "@mui/material/IconButton";
import { Theme } from "@mui/material/styles";
import { getAppConfig, getAppDoc } from "@/utils/appData";
import appImportList from "@/utils/appEntry";
import getPaths from "@/utils/getPaths";
import clsx from "clsx";
import type { GetStaticProps } from "next";

// TODO change favicon dynamically

export async function getStaticPaths({ locale }) {
	return {
		paths: getPaths(locale),
		fallback: false,
	};
}

export const getStaticProps: GetStaticProps = ({
	locale = "zh-CN",
	...ctx
}) => {
	console.log("id", locale);

	const { id: currentId } = ctx.params;

	const appConfig = getAppConfig(currentId, ["name", "status"]);

	const appDoc = getAppDoc(currentId);

	const dic = require("../../data/i18n/i18n.json");

	return {
		props: {
			currentPage: {
				title: appConfig.name,
				description: appConfig.description || "",
				path: "/app/" + appConfig.id,
			},
			appConfig,
			locale,
			dic: JSON.stringify(dic[locale]),
			appDoc,
		},
	};
};

const drawerWidth: number = 260;

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
		window.loadHide();
	}
	componentDidCatch(error: any, info: any) {
		window.snackbar({
			message: "您的浏览器捕捉到一个错误：" + error,
		});
	}
	componentDidMount() {
		const { setAction, appConfig } = this.props;

		const loadLink =
			appConfig.status === "stable" || "beta"
				? appConfig.id
				: "__development";

		this.setState({
			AppComp: appImportList[loadLink],
		});

		setAction(() => {
			const onClick = () => {
				const { RightDrawerOpen } = this.state;
				this.setState({
					RightDrawerOpen: !RightDrawerOpen,
				});
			};
			return (
				<IconButton
					color="primary"
					aria-label="Switch drawer"
					onClick={onClick}
					edge="start"
					size="large"
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
			// 		Loadable(() => import("@/components/FeedbackComp")),
			// });
		}
		this.setState({
			showFeedbackComp: true,
		});
	};
	render() {
		const { AppComp, FeedbackComp, showFeedbackComp, RightDrawerOpen } =
			this.state;
		const { appConfig, appDoc, classes } = this.props;

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
						appConfig={appConfig}
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
