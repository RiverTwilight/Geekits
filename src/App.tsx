import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./layout/header";
import loadable from "./utils/loading";
import "./App.css";
import "../node_modules/mdui/dist/css/mdui.min.css";

const RouterList = [
	{
		component: loadable(() => import("./pages/home")),
		path: "/",
		exact: true,
	},
	{
		component: loadable(() => import("./pages/user")),
		path: "/user",
		exact: true,
	},
	{
		component: loadable(() => import("./pages/user/login")),
		path: "/user/login",
	},
	{
		component: loadable(() => import("./pages/about")),
		path: "/about",
	},
	{
		component: loadable(() => import("./pages/setting")),
		path: "/setting",
	},
	{
		component: loadable(() => import("./pages/app/index")),
		path: "/app/:name",
	},
	{
		component: loadable(() => import("./pages/feedback")),
		path: "/feedback",
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

export default class extends React.Component {
	loading: any;
	componentDidMount() {
		const { loading } = this;
		const toggleDisabled = (isDisabled: any) => {
			var btns = document.getElementsByClassName("loadBtn");
			for (let i = 0; i < btns.length; i++) {
				// @ts-expect-error ts-migrate(2339) FIXME: Property 'disabled' does not exist on type 'Elemen... Remove this comment to see the full error message
				btns[i].disabled = isDisabled;
			}
		};
		window.loadShow = () => {
			// @ts-expect-error ts-migrate(2339) FIXME: Property 'loadingDelay' does not exist on type 'Wi... Remove this comment to see the full error message
			window.loadingDelay = setTimeout(() => {
				loading.style.display = "inline-block";
				toggleDisabled(true);
				// @ts-expect-error ts-migrate(2339) FIXME: Property 'loadingDelay' does not exist on type 'Wi... Remove this comment to see the full error message
				delete window.loadingDelay;
			}, 700);
		};
		window.loadHide = () => {
			// @ts-expect-error ts-migrate(2339) FIXME: Property 'loadingDelay' does not exist on type 'Wi... Remove this comment to see the full error message
			if (window.loadingDelay) {
				// @ts-expect-error ts-migrate(2339) FIXME: Property 'loadingDelay' does not exist on type 'Wi... Remove this comment to see the full error message
				clearTimeout(window.loadingDelay);
				// @ts-expect-error ts-migrate(2339) FIXME: Property 'loadingDelay' does not exist on type 'Wi... Remove this comment to see the full error message
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
	render() {
		return (
			<Router>
				<div
					ref={(r) => (this.loading = r)}
					style={{ display: "none" }}
					className="mdui-color-green-100 mdui-progress loading"
				>
					<div className="mdui-progress-indeterminate"></div>
				</div>

				<Header
					getRef={(refs: any) => {
						window.globalRef = {};
						refs.map((ref: any) => {
							window.globalRef[ref.name] = ref.ref;
						});
					}}
				/>

				<br></br>

				<Switch>
					{RouterList.map((route) => (
                        //@ts-expect-error
						<Route key={route.path} {...route}></Route>
					))}
					<Route component={NoMatch} />
				</Switch>
			</Router>
		);
	}
}
