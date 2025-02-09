import React from "react";
import { HelpOutlineTwoTone } from "@mui/icons-material";
import { useAction } from "@/contexts/action";
import { useAppBar } from "@/contexts/appBar";
import { useLocale } from "@/contexts/locale";
import AppMenu from "@/components/AppMenu";
import IconButton from "@mui/material/IconButton";
import RightDrawer from "@/components/RightDrawer";
import { FC, useCallback, useEffect, useState } from "react";
import { GetStaticProps } from "next";
import { isCapacitor, isWeb } from "@/utils/platform";
import { defaultLocale } from "src/site.config";
import { styled } from "@mui/material/styles";
import appImportList from "@/utils/appEntry";
import { getAppConfig, getAppDoc } from "@/utils/appData";
import getPaths from "@/utils/getPaths";
import { store as frameStore } from "@/utils/Data/frameState";
import generateSitemap from "@/utils/generateSitemap";
import { useRouter } from "next/router";

const drawerWidth: number = 260;

const PREFIX = "RDrawer";

const classes = {
	content: `${PREFIX}-content`,
	contentShift: `${PREFIX}-contentShift`,
};

const Root = styled("div")<{ freeSize?: boolean }>(
	({ theme }) =>
		({ freeSize }) => ({
			width: "100%",
			height: "100vh",
			paddingTop: "65px", // 65px is the height of the header, plus some padding
			[theme.breakpoints.up("sm")]: {
				paddingBottom: "8px",
			},
			[`& .${classes.content}`]: {
				height: "100%",
				overflowY: "auto",
				// width: "100%",
				[theme.breakpoints.up("sm")]: {
					// When sidebar is not open, give it a same right margin as
					// the bottom margin.
					marginRight: "8px",
					borderRadius: "24px",
				},
				marginX: { sm: 4, xs: 0 },
				background: theme.palette.background.paper,
				padding: freeSize ? "0" : "30px",
				flexGrow: 1,
				transition: theme.transitions.create("margin", {
					easing: theme.transitions.easing.sharp,
					duration: theme.transitions.duration.leavingScreen,
				}),
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
	if (isCapacitor()) {
		return {
			paths: getPaths(),
			fallback: false,
		};
	}

	const paths = ["zh-CN", "en-US"].map((locale) => getPaths(locale)).flat(1);

	generateSitemap(
		paths.map((p) => {
			return {
				url: `/app/` + p.params.id,
				changefreq: "monthly",
				priority: 0.7,
			};
		})
	);

	return {
		paths,
		fallback: false,
	};
}

export const getStaticProps: GetStaticProps = ({
	locale = defaultLocale,
	...ctx
}) => {
	const { id: currentId } = ctx.params;

	const appConfig = getAppConfig(currentId as string, {
		requiredKeys: [
			"name",
			"seoOptimizedDescription",
			"status",
			"freeSize",
			"platform",
			"keywords",
		],
		locale: locale,
	});

	const appDoc = getAppDoc(currentId as string);

	const dic = require("../../data/i18n.json");

	return {
		props: {
			currentPage: {
				title: appConfig.name,
				keywords: appConfig.keywords,
				description:
					appConfig.seoOptimizedDescription ||
					appConfig.description ||
					"",
				path: "/app/" + appConfig.id,
			},
			dic: JSON.stringify(dic),
			appConfig,
			locale,
			appDoc,
		},
	};
};

const SidebarToggle = ({ handleToggle }) => {
	return (
		<IconButton
			aria-label="Switch drawer"
			onClick={handleToggle}
			size="large"
		>
			<HelpOutlineTwoTone />
		</IconButton>
	);
};

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		console.error("AppComp error:", error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return (
				<h1>
					Something went wrong with this app. Please try again later.
				</h1>
			);
		}

		return this.props.children;
	}
}

/**
 * Universal App Container
 */
const AppContainer = ({ appConfig, appDoc }) => {
	const [FeedbackComp, setFeedbackComp] = useState(null);
	const [showFeedbackComp, setShowFeedbackComp] = useState(false);

	const { setAction } = useAction();
	const { appBar, setAppBar } = useAppBar();
	const { locale } = useLocale();
	const router = useRouter();
	const { id } = router.query;
	const loadLink =
		appConfig.status === "stable" || appConfig.status === "beta"
			? appConfig.id
			: "__development";

	const AppComp = appImportList[loadLink] as FC;

	useEffect(() => {
		setAction(<SidebarToggle handleToggle={() => setAppBar(!appBar)} />);
	}, [appBar]);

	useEffect(() => {
		if (window.location.search.indexOf("fullscreen=1") !== -1) {
			frameStore.dispatch({ type: "frame/disabled" });
		}

		return () => {
			// window.hideGlobalLoadingOverlay();
		};
	}, []);

	useEffect(() => {
		if (!isWeb()) {
			const localTitle = document.querySelector("#navbar-localTitle");
			const localizedAppConfig = getAppConfig(id as string, {
				requiredKeys: [
					"name",
					"seoOptimizedDescription",
					"status",
					"freeSize",
					"platform",
				],
				locale: locale,
			});
			appConfig = localizedAppConfig;
			localTitle.textContent = appConfig.name;
		}
	}, [locale, id]);

	const feedback = useCallback(() => {
		if (!FeedbackComp) {
			// setFeedbackComp(
			//   !FeedbackComp &&
			//   Loadable(() => import("@/components/FeedbackComp"))
			// );
		}
		setShowFeedbackComp(true);
	}, [FeedbackComp]);

	return (
		<Root freeSize={!!appConfig.freeSize}>
			<div
				className={`${classes.content} ${
					appBar ? classes.contentShift : ""
				}`}
			>
				<ErrorBoundary>{AppComp && <AppComp />}</ErrorBoundary>
			</div>
			<RightDrawer onClose={() => setAppBar(!appBar)} open={appBar}>
				<AppMenu
					appDoc={appDoc[locale]}
					feedback={feedback}
					appConfig={appConfig}
				/>
			</RightDrawer>
		</Root>
	);
};

export default AppContainer;
