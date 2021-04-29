import React, { useState, useEffect } from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import { getUserInfo } from "../../utils/Services/UserInfo";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
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
import AppsIcon from "@material-ui/icons/Apps";
import { store } from "../../data/state";
import clsx from "clsx";

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

const drawerWidth = 200;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		inline: {
			display: "inline",
		},
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
		hoverBlur: {
			[theme.breakpoints.up('sm')]: {
				transition: "filter .3s",
				filter: "blur(5px)",
				'&:hover': {
					filter: "blur(0)"
				}
			}
		}
	})
);

const User = ({ handleLogin }: any) => {
	const classes = useStyles();
	const [user, setUser]: [
		user: userInfoFromLocal | null,
		setUser: any
	] = useState(null);
	useEffect(() => {
		setUser(getUserInfo());
	}, [handleLogin]);
	const attr = user
		? {
			to: "/user",
			component: Link,
		}
		: {
			onClick: handleLogin,
		};
	return (
		<>
			{/** //@ts-expect-error */}
			<ListItem button {...attr}>
				<ListItemAvatar>
					<Avatar alt="Cindy Baker" src="/logo_design.svg" />
				</ListItemAvatar>
				<ListItemText
					primary={
						<Typography
							component="span"
							variant="h6"
							color="textPrimary"
						>
							云极客工具
						</Typography>
					}
					secondary={
						<>
							<Typography
								component="span"
								variant="body2"
								className={classes.inline}
								color="textSecondary"
							>
								{
									/*//@ts-expect-error */
									user ? user.name : "未登录"
								}
							</Typography>
						</>
					}
				/>
			</ListItem>
		</>
	);
};

// REBUILD Use redux manage state

interface IProps { history: any, handleLoginOpen: () => void };

const LeftDrawer = (props: IProps) => {
	const { handleLoginOpen, history } = props;

	const testBlur = () => /(\S+)\/app\/\S+/.test(window.location.href)

	const [open, setOpen] = React.useState(false);
	const [isBlur, setIsBlur] = React.useState(testBlur());
	const classes = useStyles();
	const theme = useTheme();

	const handleClick = () => {
		window.innerWidth <= 1024 && setOpen(false);
	};

	store.subscribe(() => setOpen(store.getState().value));

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
				onClick: handleClick,
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
		<>
			<div className={classes.toolbar}>
				<User
					handleLogin={() => {
						handleClick();
						handleLoginOpen();
					}}
				/>
			</div>
			<Divider />
			<List className={clsx({ [classes.hoverBlur]: isBlur })}>
				{list.map((item) => (
					<Warpper key={item.link} a={item} />
				))}
			</List>
		</>
	);

	history.listen(() => {
		setIsBlur(testBlur());
	});

	return (
		<nav className={classes.drawer} aria-label="left drawer">
			{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
			<Hidden smUp implementation="css">
				<Drawer
					variant="temporary"
					anchor={theme.direction === "rtl" ? "right" : "left"}
					open={open}
					onClose={() => store.dispatch({ type: "drawer/closed" })}
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

//@ts-expect-error
export default withRouter<IProps>(LeftDrawer);
