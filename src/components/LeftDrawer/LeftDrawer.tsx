import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getUserInfo } from "../../utils/Services/UserInfo";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Hidden from "@mui/material/Hidden";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useTheme, Theme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import MessageIcon from "@mui/icons-material/Message";
import GitHubIcon from "@mui/icons-material/GitHub";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import { UserContext } from "../UserContextProvider";
import clsx from "clsx";
import { store as loginDialogStore } from "../../data/loginDialogState";
import { store as drawerStore } from "../../data/drawerState";
import Alert from "@mui/material/Alert";
import MuiLink from "@mui/material/Link";

// TODO Shortcuts

const list = [
	{
		Icon: <HomeIcon />,
		text: "首页",
		href: "/",
	},
	{
		text: "divider",
	},
	{
		Icon: <MessageIcon />,
		text: "反馈",
		href: "https://support.qq.com/product/421719",
	},

	{
		Icon: <VolunteerActivismOutlinedIcon />,
		text: "捐赠",
		href: "/donate",
	},

	// {
	// 	Icon: <AppsIcon style={{ color: blue[300] }} />,
	// 	text: "发现",
	// 	href: "/discover",
	// },
	// {
	// 	Icon: <SettingsIcon style={{ color: green[500] }} />,
	// 	text: "设置",
	// 	href: "/setting",
	// },
	{
		Icon: <GitHubIcon />,
		text: "Github",
		href: "https://github.com/rivertwilight/ygktool",
	},
	{
		Icon: <InfoOutlinedIcon />,
		text: "关于",
		href: "/about",
	},
];

const drawerWidth = 240;

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
		selectedItem: {
			"&.Mui-selected .MuiListItemText-primary": {
				fontWeight: 700,
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

interface IProps {}

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

		if (text === "divider") {
			return <Divider />;
		}
		return (
			<Link href={href} passHref>
				<ListItem
					component="a"
					className={clsx(
						classes.selectedItem,
						router.pathname == href ? "Mui-selected" : ""
					)}
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
			<Alert severity="info">
				您正在使用新版本，如有任何问题欢迎随时反馈。
				<MuiLink href="https://v1.ygktool.com">返回旧版</MuiLink>
			</Alert>
			{/* <List className={clsx({ [classes.hoverBlur]: isBlur })}> */}
			<List>
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
			<Hidden smDown implementation="css">
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
