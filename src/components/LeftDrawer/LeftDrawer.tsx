import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import { repo } from "../../site.config";
import MessageIcon from "@mui/icons-material/Message";
import GitHubIcon from "@mui/icons-material/GitHub";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import { UserContext } from "../UserContextProvider";
import { store as loginDialogStore } from "@/utils/Data/loginDialogState";
import { store as drawerStore } from "@/utils/Data/drawerState";
import MuiLink from "@mui/material/Link";
import { getUserInfo } from "@/utils/Services/UserInfo";
import Shortcuts from "../Shortcuts";
import { styled } from "@mui/material/styles";

// TODO Shortcuts

const list = [
	{
		Icon: <HomeIcon />,
		text: "首页",
		href: "/",
	},
	{
		text: "<divider />",
	},
	{
		Icon: <MessageIcon />,
		text: "反馈",
		href: "https://support.qq.com/product/421719",
	},
	{
		Icon: <VolunteerActivismOutlinedIcon />,
		text: "免费捐赠",
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
		href: repo,
	},
	{
		Icon: <InfoOutlinedIcon />,
		text: "关于",
		href: "/about",
	},
];

const drawerWidth = 240;

// necessary for content to be below app bar
const Toolbar = styled("nav")(({ theme }) => theme.mixins.toolbar);

const User = ({ handleLogin }: any) => {
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
						sx={{ borderRadius: "0" }}
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
								sx={{ display: "inline" }}
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

const LinkWrapper = ({ href, text, Icon, handleClick, ...props }) => {
	if (text === "<divider />") {
		return <Divider />;
	}

	const router = useRouter();

	return (
		<Link href={href} passHref legacyBehavior {...props}>
			<ListItem
				onClick={handleClick}
				sx={{
					"&.Mui-selected .MuiListItemText-primary": {
						fontWeight: 700,
					},
				}}
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

interface IProps {
	repo?: string;
}

const LeftDrawer = (props: IProps) => {
	const { handleLoginOpen, repo, onCloseDrawer } = props;

	// const history = useHistory()

	const userData = React.useContext(UserContext);

	// console.log(userData);

	const testBlur = () => /(\S+)\/app\/\S+/.test(window.location.href);

	const [open, setOpen] = React.useState(false);
	const [isBlur, setIsBlur] = React.useState(false);

	const handleClick = () => {
		window.innerWidth <= 1024 && setOpen(false);
	};

	useEffect(() => {
		setIsBlur(testBlur());
		drawerStore.subscribe(() => setOpen(drawerStore.getState().value));
	});

	const closeDrawer = () => {
		setOpen(false);
	};

	const drawer = (
		<>
			<Toolbar>
				<User
					handleLogin={() => {
						handleClick();
						handleLoginOpen();
					}}
				/>
			</Toolbar>
			<Divider />
			<Alert severity="info">
				您正在使用新版本，如有任何问题欢迎随时反馈。
				<MuiLink href="https://v1.ygktool.com">返回旧版</MuiLink>
			</Alert>
			{/* <List className={clsx({ [classes.hoverBlur]: isBlur })}> */}
			<List>
				{list.length &&
					list.map((item) => (
						<React.Fragment key={item.href}>
							<LinkWrapper
								handleClick={closeDrawer}
								href={item.href}
								text={item.text}
								Icon={item.Icon}
							/>
						</React.Fragment>
					))}
			</List>
			<Box padding={1}>
				<Shortcuts />
			</Box>
		</>
	);

	// history.listen(() => {
	// 	setIsBlur(testBlur());
	// });

	return (
		<Box
			component="nav"
			sx={{
				width: { sm: drawerWidth },
				flexShrink: { sm: 0 },
			}}
			aria-label="mailbox folders"
		>
			<Drawer
				variant="temporary"
				open={open}
				onClose={() => drawerStore.dispatch({ type: "drawer/closed" })}
				ModalProps={{
					keepMounted: true, // Better open performance on mobile.
				}}
				sx={{
					display: { xs: "block", sm: "none" },
					"& .MuiDrawer-paper": {
						boxSizing: "border-box",
						width: drawerWidth,
					},
					zIndex: (theme) => theme.zIndex.drawer + 2,
				}}
			>
				{drawer}
			</Drawer>
			<Drawer
				variant="permanent"
				sx={{
					display: { xs: "none", sm: "block" },
					"& .MuiDrawer-paper": {
						boxSizing: "border-box",
						width: drawerWidth,
					},
				}}
				open
			>
				{drawer}
			</Drawer>
		</Box>
	);
};

export default LeftDrawer;
