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
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { repo } from "../site.config";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import { UserContext } from "./UserContextProvider";
import { store as loginDialogStore } from "@/utils/Data/loginDialogState";
import { getUserInfo } from "@/utils/Services/UserInfo";
import { styled } from "@mui/material/styles";
import {
	Cloud,
	OpenInBrowser,
	Settings,
	TimerOutlined,
} from "@mui/icons-material";
import { Theme, useMediaQuery } from "@mui/material";
import { useSidebar } from "@/contexts/sidebar";
import Text from "./i18n";
import { isIOS, isWeb } from "@/utils/platform";
import useNotifications from "@/utils/Hooks/useNotification";
import { Badge } from "@mui/material";

const drawerWidth = 260;

// necessary for content to be below app bar
const Toolbar = styled("nav")(({ theme }) => theme.mixins.toolbar);

const LinkWrapper = ({ href, text, Icon, handleClick, sx, ...props }) => {
	if (text === "<divider />") {
		return <Divider sx={{ marginY: 1 }} />;
	}

	const router = useRouter();

	return (
		<Link href={href} passHref legacyBehavior {...props}>
			<ListItem
				onClick={handleClick}
				sx={{
					"&.Mui-selected .MuiListItemText-primary": {
						fontFamily: "Product Sans Bold",
					},
					borderBottomRightRadius: "30px",
					borderTopRightRadius: "30px",
					paddingLeft: "20px",
					...sx,
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

const Sidebar = () => {
	// const history = useHistory()

	const userData = React.useContext(UserContext);

	const { sidebar, setSidebar } = useSidebar();

	const downXs = useMediaQuery((theme: Theme) =>
		theme.breakpoints.down("md")
	);

	const handleClickNavItem = () => {
		if (downXs) {
			setSidebar(true); // Should reverse as defaultly hide on mobile screen
		}
	};

	const [notifications] = useNotifications();
	const unreadCount = notifications.filter((n) => !n.isRead).length;

	const list = [
		{
			Icon: <HomeOutlinedIcon />,
			text: <Text k="navbar.home" />,
			href: "/",
		},
		{
			Icon: <Settings />,
			text: <Text k="navbar.settings" />,
			href: "/settings",
		},
		{
			Icon: <MessageOutlinedIcon />,
			text: <Text k="navbar.feedback" />,
			href: "/feedback",
			// href: "https://support.qq.com/product/421719",
		},
		!isIOS() && {
			Icon: <VolunteerActivismOutlinedIcon />,
			text: <Text k="navbar.donation" />,
			href: "/donate",
		},

		{
			Icon: <InfoOutlinedIcon />,
			text: "<divider />",
			href: "/about",
		},
		{
			Icon: <InfoOutlinedIcon />,
			text: <Text k="navbar.about" />,
			href: "/about",
		},
		{
			Icon: <GitHubIcon />,
			text: "GitHub",
			href: repo,
			// sx: {
			// 	display: {
			// 		sm: "none",
			// 	},
			// },
		},
		{
			Icon: (
				<Badge badgeContent={unreadCount} color="error">
					<TimerOutlined />
				</Badge>
			),
			text: <Text k="navbar.log" />,
			href: "/changelog",
		},
	];

	const drawer = (
		<Box
			display="flex"
			flexDirection="column"
			height="100%"
			sx={{
				paddingBottom: { xs: "unset", sm: "70px" },
			}}
		>
			<Box flex="1" overflow="auto">
				<List sx={{ pr: "20px" }}>
					{list.length &&
						list
							.filter((item) => item)
							.map((item) => (
								<React.Fragment key={item.href + item.text}>
									<LinkWrapper
										handleClick={handleClickNavItem}
										href={item.href}
										text={item.text}
										sx={item.sx}
										Icon={item.Icon}
									/>
								</React.Fragment>
							))}
				</List>
				{/* <Box padding={1}>
					<Shortcuts />
				</Box> */}
			</Box>
			<Box alignSelf="stretch">
				<List sx={{ cursor: "pointer" }}>
					<Link
						href="https://www.ygeeker.com"
						passHref
						legacyBehavior
					>
						<ListItem dense>
							<ListItemAvatar>
								<Avatar
									sx={{ width: 24, height: 24 }}
									alt="YGeeker Logo"
									src="https://www.ygeeker.com/logo-optimized.svg"
								/>
							</ListItemAvatar>
							<ListItemText
								sx={{
									"& .MuiListItemText-primary": {
										fontFamily: "Product Sans",
									},
								}}
								primary={<Text k="navbar.copyright.title" />}
								secondary={
									<Text k="navbar.copyright.subtitle" />
								}
							/>
						</ListItem>
					</Link>
				</List>
			</Box>
		</Box>
	);

	return (
		<Box
			component="nav"
			sx={{
				width: { sm: sidebar ? drawerWidth : 24 },
				flexShrink: { sm: 0 },
				transition: (theme) =>
					theme.transitions.create("width", {
						easing: theme.transitions.easing.sharp,
						duration: theme.transitions.duration.enteringScreen,
					}),
			}}
			aria-label="mailbox folders"
		>
			<Drawer
				variant="temporary"
				disableScrollLock
				open={!sidebar}
				onClose={() => setSidebar(true)} // Should reverse as defaultly hide on mobile screen
				ModalProps={{
					keepMounted: true, // Better open performance on mobile.
				}}
				sx={{
					display: { xs: "block", sm: "none" },
					"& .MuiDrawer-paper": {
						boxSizing: "border-box",
						paddingTop: "var(--ion-safe-area-top)",
						width: drawerWidth,
						background: (theme) => theme.palette.background.default,
					},
					zIndex: (theme) => theme.zIndex.drawer + 2,
				}}
			>
				{drawer}
			</Drawer>
			<Drawer
				disableScrollLock
				variant="persistent"
				sx={{
					zIndex: (theme) => theme.zIndex.drawer,
					display: { xs: "none", sm: "block" },
					"& .MuiDrawer-paper": {
						boxSizing: "border-box",
						marginTop: "68px",
						borderRight: "none",
						width: drawerWidth,
						background: (theme) => theme.palette.background.default,
					},
				}}
				open={sidebar}
				onClose={() => setSidebar(false)}
			>
				{drawer}
			</Drawer>
		</Box>
	);
};

export default Sidebar;
