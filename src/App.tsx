import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./layout/header";
import { snackbar, Dialog } from "mdui";
import LeftDrawer from "./layout/LeftDrawer";
import RightDrawer from "./layout/RightDrawer";
import LoginDialog from "./layout/LoginDialog";
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
		component: loadable(() => import("./views/user/login")),
		path: "/user/login",
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

const NoMatch = () => (
	<div className="mdui-text-color-theme-text center-panel">
		<h2 className="mdui-text-center">电波无法到达哦</h2>
		<p>
			是不是地址拼错了？是/app不是/apps哦<br></br>
			想要的工具不见了？返回首页找找吧！<br></br>
		</p>
		<Link to="/" className="mdui-color-theme mdui-btn mdui-btn-raised">
			返回首页
		</Link>
	</div>
);

class App extends React.Component<
	any,
	{
		showLoginDialog: boolean;
		rightDrawerContent: any;
	}
> {
	loading: any;
	constructor(props: any) {
		super(props);
		this.state = {
			showLoginDialog: false,
			rightDrawerContent: null,
		};
	}
	componentDidUpdate() {
		this.state.showLoginDialog && window.dialogInst.open();
		!this.state.showLoginDialog && window.dialogInst.close();
	}
	componentDidMount() {
		const { loading } = this;

		window.dialogInst = new Dialog("#loginDialog", {
			history: false,
			destroyOnClosed: false,
			closeOnCancel: false,
			closeOnEsc: true,
			closeOnConfirm: false,
		});
		//@ts-expect-error
		document
			.getElementById("loginDialog")
			.addEventListener(
				"closed.mdui.dialog",
				this.closeLoginDialog.bind(this)
			);

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
			window.globalRef.title.innerText = pageName || "云极客工具";
			document.title = pageName
				? `${pageName} - 云极客工具`
				: "云极客工具";
		};
		window.setRightDrawer = (content, icon) => {
			this.setState({
				rightDrawerContent: content,
			});
			document.body.classList.add("mdui-drawer-body-right");
			window.globalRef.menuBtn.style.display = "block";
			window.menu = () => {
				window.RightDrawer.toggle();
			};
		};
	}
	openLoginDialog = () => {
		this.setState({
			showLoginDialog: true,
		});
	};
	closeLoginDialog = () => {
		this.setState({
			showLoginDialog: false,
		});
	};
	getGlobalRef = (refs: any) => {
		window.globalRef = {};
		refs.map((ref: any) => {
			window.globalRef[ref.name] = ref.ref;
		});
	};
	render() {
		const { showLoginDialog, rightDrawerContent } = this.state;
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
					<LoginDialog ifOpen={showLoginDialog} />
					<LeftDrawer openLoginDialog={this.openLoginDialog} />
					{rightDrawerContent && (
						<RightDrawer content={rightDrawerContent} />
					)}
					<Header
						openLoginDialog={this.openLoginDialog}
						getRef={this.getGlobalRef}
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
