import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./layout/header";
import Drawer from "./layout/drawer";
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

class App extends React.Component<any, any> {
	loading: any;
	constructor(props: any) {
		super(props);
		this.state = {
			showLoginDialog: false,
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
			// @ts-expect-error ts-migrate(2339) FIXME: Property 'loadingDelay' does not exist on type 'Wi... Remove this comment to see the full error message
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
	}
	openLoginDialog = () => {
		this.setState({
			showLoginDialog: true,
		});
	}
	getGlobalRef = (refs: any) => {
		window.globalRef = {};
		refs.map((ref: any) => {
			window.globalRef[ref.name] = ref.ref;
		});
	};
	render() {
		const { showLoginDialog } = this.state;
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
					<Drawer openLoginDialog={this.openLoginDialog} />
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
