import React from "react";
import { NavLink } from "react-router-dom";
import { getUserInfo } from "../../utils/Services/UserInfo";
import applist from "../../data/appData";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {
	makeStyles,
	useTheme,
	Theme,
	createStyles,
} from "@material-ui/core/styles";
import HomeIcon from "@material-ui/icons/Home";
import SettingsIcon from "@material-ui/icons/Settings";
import GitHubIcon from "@material-ui/icons/GitHub";
import { green, red, blue } from "@material-ui/core/colors";
import AppsIcon from '@material-ui/icons/Apps';

const list = [
	{
		Icon: <HomeIcon style={{ color: red[500] }} />,
		text: "首页",
		link: "/",
	},
	{
		Icon: <AppsIcon style={{ color: blue[300] }} />,
		text: "发现",
		link: "/discover",
	},
	{
		Icon: <SettingsIcon style={{ color: green[500] }} />,
		text: "设置",
		link: "/setting",
	},
	{
		Icon: <GitHubIcon />,
		text: "Github",
		link: "https://github.com/rivertwilight/ygktool",
	},
];

// class DrawerMenu extends React.Component<
// 	{
// 		openLoginDialog: any;
// 	},
// 	{}
// > {
// 	componentDidMount() {
// 		window.leftDrawer = new Drawer("#left-drawer");
// 	}
// 	handleLogin = () => {
// 		window.innerWidth <= 1024 && window.leftDrawer.close();
// 		this.props.openLoginDialog();
// 	};
// 	render() {
// 		const user = getUserInfo();
// 		return (
// 			<div id="left-drawer" className="mdui-drawer">
// 				<div
// 					style={{ height: "130px" }}
// 					className="mdui-shadow-0 mdui-card"
// 				>
// 					<div className="mdui-card-primary">
// 						<div className="mdui-card-primary-title mdui-text-color-theme">
// 							云极客工具
// 						</div>
// 						<div className="mdui-card-primary-subtitle">{`共有${
// 							applist.filter((app: any) => app.channel !== 5)
// 								.length
// 						}个工具`}</div>
// 					</div>
// 				</div>
// 				<ul className="mdui-list">
// 					{user ? (
// 						<NavLink
// 							onClick={() => {
// 								window.innerWidth <= 1024 &&
// 									window.leftDrawer.close();
// 							}}
// 							exact
// 							className="mdui-list-item mdui-ripple"
// 							activeClassName="mdui-list-item-active"
// 							to="/user"
// 						>
// 							<i className="mdui-list-item-avatar mdui-Icon material-icons">
// 								face
// 							</i>
// 							<div className="mdui-list-item-content">
// 								{user.username}
// 							</div>
// 						</NavLink>
// 					) : (
// 						<li
// 							onClick={this.handleLogin}
// 							className="mdui-list-item mdui-ripple"
// 						>
// 							<i className="mdui-list-item-avatar mdui-Icon material-icons">
// 								face
// 							</i>
// 							<div className="mdui-list-item-content">
// 								{"注册/登录"}
// 							</div>
// 						</li>
// 					)}
// 					<div className="mdui-divider" />
// 					<Menu />
// 				</ul>
// 				{/* <p className="mdui-text-center copyright">
// 					©2019-2020&nbsp;江村暮
// 				</p> */}
// 			</div>
// 		);
// 	}
// }

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		drawer: {
			[theme.breakpoints.up("sm")]: {
				width: drawerWidth,
				flexShrink: 0,
			},
		},
		appBar: {
			[theme.breakpoints.up("sm")]: {
				width: `calc(100% - ${drawerWidth}px)`,
				marginLeft: drawerWidth,
			},
		},
		menuButton: {
			marginRight: theme.spacing(2),
			[theme.breakpoints.up("sm")]: {
				display: "none",
			},
		},
		// necessary for content to be below app bar
		toolbar: theme.mixins.toolbar,
		drawerPaper: {
			width: drawerWidth,
		},
	})
);

const Warpper = (props: { a: { link: string; text: string; Icon: any } }) => {
	let { link, text, Icon } = props.a;
	const attr = link.match(/(http|https)/)
		? {
				href: link,
				component: "a",
		  }
		: {
				activeClassName: "Mui-selected",
				component: NavLink,
				to: link,
				exact: true,
		  };
	return (
		<ListItem button key={text} {...attr}>
			<ListItemIcon>{Icon}</ListItemIcon>
			<ListItemText primary={text} />
		</ListItem>
	);
};

export default (props: {
	handleLoginOpen: () => void;
	handleDrawerClose: () => void;
	open: boolean;
}) => {
	const { handleDrawerClose, open } = props;
	const classes = useStyles();
	const theme = useTheme();
	const handleClick = () => {
		window.innerWidth <= 1024 && handleDrawerClose();
	};

	const Warpper = (props: {
		a: { link: string; text: string; Icon: any };
	}) => {
		let { link, text, Icon } = props.a;
		const attr = link.match(/(http|https)/)
			? {
					href: link,
					component: "a",
			  }
			: {
					activeClassName: "Mui-selected",
					component: NavLink,
					to: link,
					exact: true,
			  };
		return (
			<ListItem button key={text} {...attr}>
				<ListItemIcon>{Icon}</ListItemIcon>
				<ListItemText primary={text} />
			</ListItem>
		);
	};
	const drawer = (
		<div>
			<div className={classes.toolbar} />
			<Divider />
			<List>
				{list.map((item) => (
					<Warpper a={item} />
				))}
			</List>
		</div>
	);
	return (
		<nav className={classes.drawer} aria-label="mailbox folders">
			{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
			<Hidden smUp implementation="css">
				<Drawer
					variant="temporary"
					anchor={theme.direction === "rtl" ? "right" : "left"}
					open={open}
					onClose={handleDrawerClose}
					classes={{
						paper: classes.drawerPaper,
					}}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
				>
					{drawer}
				</Drawer>
			</Hidden>
			<Hidden xsDown implementation="css">
				<Drawer
					classes={{
						paper: classes.drawerPaper,
					}}
					variant="permanent"
					open
				>
					{drawer}
				</Drawer>
			</Hidden>
		</nav>
	);
};
