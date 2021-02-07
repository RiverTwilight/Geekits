import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./layout/Header";
import LeftDrawer from "./layout/LeftDrawer";
import RightDrawer from "./layout/RightDrawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import NoMatch from "./views/404";
import loadable from "./utils/loading";
import "./App.css";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const styles = (theme: Theme) => {
	return createStyles({
		root: {
			display: "flex",
		},
		content: {
			flexGrow: 1,
			padding: theme.spacing(2),
			paddingTop: "75px"
		},
		contentShift: {
			transition: theme.transitions.create("margin", {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
			}),
			marginLeft: 0,
		},
		loading: {
			position: "fixed",
			top: 0,
			width: "100%",
		},
	});
};

const RouterList: {
	component: any;
	path: string;
	exact?: boolean;
}[] = [
	{
		component: loadable(() => import("./views/home")),
		path: "/",
		exact: true,
	},
	// {
	// 	component: loadable(() => import("./views/user/index")),
	// 	path: "/user",
	// 	exact: true,
	// },
	// {
	// 	component: loadable(() => import("./views/user/forget")),
	// 	path: "/user/forget",
	// },
	// {
	// 	component: loadable(() => import("./views/about")),
	// 	path: "/about",
	// },
	// {
	// 	component: loadable(() => import("./views/setting")),
	// 	path: "/setting",
	// },
	{
		component: loadable(() => import("./views/app/index")),
		path: "/app/:name",
	},
];

const RightMenuBtnRef = React.createRef<HTMLDivElement>();
const AppBarRef = React.createRef<HTMLDivElement>();

export default withStyles(styles)(
	class App extends React.Component<
		any,
		{
			showLoginDialog: boolean;
			rightDrawerContent: any;
			LoginDialog: any;
			LeftDrawerOpen: boolean;
			anchorEl: null | HTMLElement;
			loading: boolean;
		}
	> {
		loading: any;
		constructor(props: any) {
			super(props);
			this.state = {
				LeftDrawerOpen: false,
				showLoginDialog: false,
				rightDrawerContent: null,
				LoginDialog: null,
				anchorEl: null,
				loading: true,
			};
		}
		componentDidMount() {
			const { loading } = this;

			const toggleDisabled = (isDisabled: any) => {
				var btns = document.getElementsByClassName("loadBtn");
				for (let i = 0; i < btns.length; i++) {
					//@ts-expect-error
					btns[i].disabled = isDisabled;
				}
			};
			window.loadShow = () => {
				window.loadingDelay = setTimeout(() => {
					loading.style.display = "inline-block";
					toggleDisabled(true);
					delete window.loadingDelay;
				}, 700);
			};
			window.loadHide = () => {
				if (window.loadingDelay) {
					clearTimeout(window.loadingDelay);
					delete window.loadingDelay;
				} else {
					loading.style.display = "none";
					toggleDisabled(false);
				}
			};
			window.updateTitle = (pageName) => {
				if (AppBarRef.current)
					AppBarRef.current.innerText = pageName || "云极客工具";
				document.title = pageName
					? `${pageName} - 云极客工具`
					: "云极客工具";
			};
			window.setRightDrawer = (content, icon) => {
				this.setState({
					rightDrawerContent: content,
				});
				document.body.classList.add("mdui-drawer-body-right");
				if (RightMenuBtnRef.current)
					RightMenuBtnRef.current.style.display = "block";
				window.menu = () => {
					window.RightDrawer.toggle();
				};
			};
			window.destoryRightDrawer = () => {
				if (this.state.rightDrawerContent) {
					this.setState({
						rightDrawerContent: null,
					});
					document.body.classList.remove("mdui-drawer-body-right");
					if (RightMenuBtnRef.current)
						RightMenuBtnRef.current.style.display = "none";
				}
			};
		}
		openLoginDialog = () => {
			let { LoginDialog } = this.state;
			if (!LoginDialog) {
				this.setState({
					LoginDialog:
						!LoginDialog &&
						loadable(() => import("./layout/LoginDialog")),
				});
			}
			this.setState({
				showLoginDialog: true,
			});
		};
		closeLoginDialog = () => {
			this.setState({
				showLoginDialog: false,
			});
		};
		render() {
			const { classes } = this.props;
			const {
				LeftDrawerOpen,
				showLoginDialog,
				rightDrawerContent,
				LoginDialog,
				loading,
			} = this.state;
			return (
				<>
					{loading && (
						<LinearProgress
							color="primary"
							className={classes.loading}
						/>
					)}
					<div className={classes.root}>
						<CssBaseline />
						<Router>
							{LoginDialog && (
								<LoginDialog
									open={showLoginDialog}
									onClose={() => {
										this.setState({
											showLoginDialog: false,
										});
									}}
								/>
							)}
							{/* {rightDrawerContent && (
						<RightDrawer content={rightDrawerContent} />
					)} */}
							<Header
								handleLeftDrawerOpen={() => {
									this.setState({
										LeftDrawerOpen: true,
									});
								}}
								open={LeftDrawerOpen}
								// openLoginDialog={this.openLoginDialog}
								// globalRefs={{ RightMenuBtnRef, AppBarRef }}
							/>
							<LeftDrawer
								handleLoginOpen={() => {}}
								handleDrawerClose={() => {
									this.setState({
										LeftDrawerOpen: false,
									});
								}}
								open={LeftDrawerOpen}
							/>
							<main className={classes.content}>
								<Switch>
									{RouterList.map((route) => (
										<Route
											key={route.path}
											{...route}
										></Route>
									))}
									<Route component={NoMatch} />
								</Switch>
							</main>
						</Router>
					</div>
				</>
			);
		}
	}
);
