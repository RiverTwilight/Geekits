import loadable from "../../../utils/loading";
import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

const UserRouterList = [
	{
		component: loadable(() => import("./page/home")),
		path: "/",
		exact: true,
	},
	{
		component: loadable(() => import("./page/sync")),
		path: "/sync",
		exact: true,
	},
	{
		component: loadable(() => import("./page/rePwd")),
		path: "/rePwd",
		exact: true,
	},
	{
		component: loadable(() => import("./page/reEmail")),
		path: "/reEmail",
		exact: true,
	},
];

class UserDashboard extends React.Component {
	constructor(props: any) {
		super(props);
	}
	render() {
		return (
			<>
				<Router>
					<Switch>
						{UserRouterList.map((route) => (
							<Route {...route}></Route>
						))}
					</Switch>
				</Router>
			</>
		);
	}
}

export default UserDashboard;
