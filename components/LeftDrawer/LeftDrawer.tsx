import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
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
import { UserContext } from "../UserContextProvider";
import clsx from "clsx";
import { store as loginDialogStore } from "../../data/loginDialogState";
import { store as drawerStore } from "../../data/drawerState";

const list = [
	{
		Icon: <HomeIcon style={{ color: red[500] }} />,
		text: "首页",
		href: "/",
	},
	{
		Icon: <AppsIcon style={{ color: blue[300] }} />,
		text: "发现",
		href: "/discover",
	},
	{
		Icon: <SettingsIcon style={{ color: green[500] }} />,
		text: "设置",
		href: "/setting",
	},
	{
		Icon: <GitHubIcon />,
		text: "Github",
		href: "https://github.com/rivertwilight/ygktool",
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
			[theme.breakpoints.up("sm")]: {
				transition: "filter .3s",
				filter: "blur(5px)",
				"&:hover": {
					filter: "blur(0)",
				},
			},
		},
		icon: {
			borderRadius: "0",
		},
	})
);

const User = ({ handleLogin }: any) => {
	const classes = useStyles();
	const [user, setUser]: [user: userInfoFromLocal | null, setUser: any] =
		useState(null);
	useEffect(() => {
		setUser(getUserInfo());
	}, [handleLogin]);
	const attr = user
		? {
				href: "/user",
				component: Link,
		  }
		: {
				onClick: () => {
					loginDialogStore.dispatch({ type: "loginDialog/opened" });
				},
		  };
	return (
		<>
			<ListItem button {...attr}>
				<ListItemAvatar>
					<Avatar
						className={classes.icon}
						alt="Cindy Baker"
						src="/logo/v2/512.png"
					/>
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
								{user ? user.name : "未登录"}
							</Typography>
						</>
					}
				/>
			</ListItem>
		</>
	);
};

interface IProps {

}

const LeftDrawer = (props: IProps) => {
	const { handleLoginOpen } = props;

	// const history = useHistory()

	const userData = React.useContext(UserContext);

	// console.log(userData);

	const testBlur = () => /(\S+)\/app\/\S+/.test(window.location.href);

	const [open, setOpen] = React.useState(false);
	const [isBlur, setIsBlur] = React.useState(false);
	const classes = useStyles();
	const theme = useTheme();

	const handleClick = () => {
		window.innerWidth <= 1024 && setOpen(false);
	};

	useEffect(() => {
		setIsBlur(testBlur());
		drawerStore.subscribe(() => setOpen(drawerStore.getState().value));
	});

	const Warpper = (props: {
		a: { href: string; text: string; Icon: any };
	}) => {
		const router = useRouter();
		let { href = "/", text, Icon } = props.a;
		return (
			<Link href={href} passHref>
				<ListItem
					component="a"
					className={router.pathname == href ? "Mui-selected" : ""}
					button
					key={text}
				>
					<ListItemIcon>{Icon}</ListItemIcon>
					<ListItemText primary={text} />
				</ListItem>
			</Link>
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

	// history.listen(() => {
	// 	setIsBlur(testBlur());
	// });

	return (
		<nav className={classes.drawer} aria-label="left drawer">
			{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
			<Hidden smUp implementation="css">
				<Drawer
					variant="temporary"
					anchor={theme.direction === "rtl" ? "right" : "left"}
					open={open}
					onClose={() =>
						drawerStore.dispatch({ type: "drawer/closed" })
					}
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

export default LeftDrawer;
