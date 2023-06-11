import React from "react";
import AppMenu from "@/components/AppMenu";
import RightDrawer from "@/components/RightDrawer";
import HelpTwoToneIcon from "@mui/icons-material/HelpTwoTone";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { getAppConfig, getAppDoc } from "@/utils/appData";
import appImportList from "@/utils/appEntry";
import getPaths from "@/utils/getPaths";
import { store as frameStore } from "@/utils/Data/frameState";

import type { GetStaticProps } from "next";

const drawerWidth: number = 260;

const PREFIX = "RDrawer";

const classes = {
	content: `${PREFIX}-content`,
	contentShift: `${PREFIX}-contentShift`,
};

const Root = styled("div")<{ freeSize?: boolean }>(
	({ theme }) =>
		({ freeSize }) => ({
			padding: `${freeSize ? "0" : theme.spacing(2)}`,
			margin: freeSize ? "unset" : "0 auto",
			maxWidth: freeSize ? "unset" : "1120px",
			height: '100%',
			[`& .${classes.content}`]: {
				position: "relative",
				minHeight: "100%",
				height: '100%',
				flexGrow: 1,
				transition: theme.transitions.create("margin", {
					easing: theme.transitions.easing.sharp,
					duration: theme.transitions.duration.leavingScreen,
				}),
				marginRight: 0,
			},

			[`& .${classes.contentShift}`]: {
				[theme.breakpoints.up("sm")]: {
					transition: theme.transitions.create("margin", {
						easing: theme.transitions.easing.easeOut,
						duration: theme.transitions.duration.enteringScreen,
					}),
					marginRight: drawerWidth,
				},
			},
		})
);

export async function getStaticPaths() {
	return {
		paths: ["zh-CN", "en-US"].map((locale) => getPaths(locale)).flat(1),
		fallback: false,
	};
}

export const getStaticProps: GetStaticProps = ({
	locale = "zh-CN",
	...ctx
}) => {
	const { id: currentId } = ctx.params;

	const appConfig = getAppConfig(currentId, ["name", "status", "freeSize"]);

	const appDoc = getAppDoc(currentId);

	const dic = require("../../data/i18n.json");

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
					edge="end"
					size="large"
					sx={{
						marginLeft: "auto",
						// mr: { sm: `${RightDrawerOpen ? drawerWidth + 10 : 0}px` },
					}}
				>
					<HelpTwoToneIcon />
				</IconButton>
			);
		});

		if (window.location.search.indexOf("fullscreen=1") !== -1) {
			frameStore.dispatch({ type: "frame/disabled" });
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
		const { appConfig, appDoc } = this.props;

		return (
			<Root freeSize={!!appConfig.freeSize}>
				<div
					className={`${classes.content} ${
						RightDrawerOpen ? classes.contentShift : ""
					}`}
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
			</Root>
		);
	}
}

export default AppContainer;
