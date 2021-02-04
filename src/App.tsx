import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./layout/header";
import LeftDrawer from "./layout/LeftDrawer";
import RightDrawer from "./layout/RightDrawer";
import NoMatch from "./views/404";
import loadable from "./utils/loading";
import "./App.css";
import "../node_modules/mdui/dist/css/mdui.min.css";

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
	{
		component: loadable(() => import("./views/user/index")),
		path: "/user",
		exact: true,
	},
	{
		component: loadable(() => import("./views/user/forget")),
		path: "/user/forget",
	},
	{
		component: loadable(() => import("./views/about")),
		path: "/about",
	},
	{
		component: loadable(() => import("./views/setting")),
		path: "/setting",
	},
	{
		component: loadable(() => import("./views/app/index")),
		path: "/app/:name",
	},
];

const RightMenuBtnRef = React.createRef<HTMLDivElement>();
const AppBarRef = React.createRef<HTMLDivElement>();

class App extends React.Component<
	any,
	{
		showLoginDialog: boolean;
		rightDrawerContent: any;
		LoginDialog: any;
	}
> {
	loading: any;
	constructor(props: any) {
		super(props);
		this.state = {
			showLoginDialog: false,
			rightDrawerContent: null,
			LoginDialog: null,
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
	// getGlobalRef = (refs: any) => {
	// 	window.globalRef = {};
	// 	refs.map((ref: any) => {
	// 		window.globalRef[ref.name] = ref.ref;
	// 	});
	// };

	render() {
		const { showLoginDialog, rightDrawerContent, LoginDialog } = this.state;
		return (
			<>
				<div
					ref={(r) => (this.loading = r)}
					style={{ display: "none" }}
					className="mdui-color-green-100 mdui-progress loading"
				>
					<div className="mdui-progress-indeterminate"></div>
				</div>
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
					<LeftDrawer openLoginDialog={this.openLoginDialog} />
					{rightDrawerContent && (
						<RightDrawer content={rightDrawerContent} />
					)}
					<Header
						openLoginDialog={this.openLoginDialog}
						globalRefs={{ RightMenuBtnRef, AppBarRef }}
					/>
					<br></br>
					<Switch>
						{RouterList.map((route) => (
							<Route key={route.path} {...route}></Route>
						))}
						<Route component={NoMatch} />
					</Switch>
				</Router>
			</>
		);
	}
}

export default App;
