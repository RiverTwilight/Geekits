import React from "react";
import { NavLink } from "react-router-dom";
import { Drawer } from "mdui";
import { getUserInfo } from "../utils/Services/UserInfo";
import applist from "../utils/applist";

const list = [
	{
		icon: "home",
		iconColor: "red",
		text: "首页",
		link: "/",
	},
	{
		icon: "settings",
		iconColor: "",
		text: "设置",
		link: "/setting",
	},
	{
		icon: "code",
		iconColor: "black",
		text: "Github",
		link: "https://github.com/rivertwilight/ygktool",
	},
];

const Menu = () => {
	const Warpper = ({ a, children }: { a: any; children: any }) => {
		if (a.link.match(/(http|https)/)) {
			return (
				<a href={a.link} className="mdui-list-item mdui-ripple">
					{children}
					<i className="mdui-list-item-icon mdui-icon material-icons mdui-text-color-grey-400">open_in_new</i>
				</a>
			);
		}
		return (
			<NavLink
				onClick={() => {
					window.innerWidth <= 1024 && window.leftDrawer.close();
				}}
				key={a.link}
				exact
				className="mdui-list-item mdui-ripple"
				activeClassName="mdui-list-item-active"
				to={a.link}
			>
				{children}
			</NavLink>
		);
	};
	return (
		<>
			{list.map((a) => (
				<Warpper a={a}>
					<i
						className={
							"mdui-list-item-icon mdui-icon material-icons mdui-text-color-" +
							a.iconColor
						}
					>
						{a.icon}
					</i>
					<div className="mdui-list-item-content">{a.text}</div>
				</Warpper>
			))}
		</>
	);
};

class DrawerMenu extends React.Component<
	{
		openLoginDialog: any;
	},
	{}
> {
	componentDidMount() {
		window.leftDrawer = new Drawer("#left-drawer");
	}
	render() {
		const user = getUserInfo();
		const { openLoginDialog } = this.props;
		return (
			<div id="left-drawer" className="mdui-drawer">
				<div
					style={{ height: "130px" }}
					className="mdui-shadow-0 mdui-card"
				>
					<div className="mdui-card-primary">
						<div className="mdui-card-primary-title mdui-text-color-theme">
							云极客工具
						</div>
						<div className="mdui-card-primary-subtitle">{`共有${
							applist.filter((app: any) => app.channel !== 5)
								.length
						}个工具`}</div>
					</div>
				</div>
				<ul className="mdui-list">
					{user ? (
						<NavLink
							onClick={() => {
								window.innerWidth <= 1024 &&
									window.leftDrawer.close();
							}}
							exact
							className="mdui-list-item mdui-ripple"
							activeClassName="mdui-list-item-active"
							to="/user"
						>
							<i className="mdui-list-item-avatar mdui-icon material-icons">
								face
							</i>
							<div className="mdui-list-item-content">
								{user.username}
							</div>
						</NavLink>
					) : (
						<li
							onClick={() => {
								window.innerWidth <= 1024 &&
									window.leftDrawer.close();
								openLoginDialog();
							}}
							className="mdui-list-item mdui-ripple"
						>
							<i className="mdui-list-item-avatar mdui-icon material-icons">
								face
							</i>
							<div className="mdui-list-item-content">
								{"未登录"}
							</div>
						</li>
					)}
					<div className="mdui-divider" />
					<Menu />
				</ul>
				<p className="mdui-text-center copyright">
					©2019-2020&nbsp;江村暮
				</p>
			</div>
		);
	}
}

export default DrawerMenu;
