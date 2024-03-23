import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import Popover from "@mui/material/Popover";
import IconButton from "@mui/material/IconButton";
import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { store } from "@/utils/Data/drawerState";
import {
	GitHub,
	MessageOutlined,
	MessageRounded,
	NotificationsOutlined,
	SettingsApplicationsRounded,
	SettingsRounded,
} from "@mui/icons-material";
import Link from "next/link";
import {
	Avatar,
	Badge,
	ListItemAvatar,
	ListItemText,
	Menu,
	Paper,
	Theme,
	useMediaQuery,
} from "@mui/material";
import useNotifications from "@/utils/Hooks/useNotification";
import { useSidebar } from "@/contexts/sidebar";

function ElevationScroll(props: Props) {
	const { children } = props;

	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
	});

	return React.cloneElement(children, {
		elevation: trigger ? 3 : 0,
		sx: {
			borderBottom: trigger ? "" : "none",
		},
	});
}

interface Props {
	children: React.ReactElement;
}

function NotificationButton() {
	const [notifications] = useNotifications();
	const unreadCount = notifications.filter((n) => !n.isRead).length;

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handlePopoverClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	if (!unreadCount) return null;

	return (
		<>
			<IconButton
				edge="end"
				size="large"
				aria-label="notifications"
				onClick={handlePopoverOpen}
			>
				<Badge badgeContent={unreadCount} color="error">
					<NotificationsOutlined />
				</Badge>
			</IconButton>

			<Popover
				open={open}
				anchorEl={anchorEl}
				onClose={handlePopoverClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				sx={{
					"& .MuiPopover-paper": {
						borderRadius: "24px",
						background: (theme) => theme.palette.background.default,
					},
				}}
			>
				<List
					sx={{
						width: "100%",
						maxWidth: 360,
						bgcolor: "background.paper",
					}}
				>
					{notifications.length === 0 ? (
						<ListItem>
							<ListItemText primary="No notifications" />
						</ListItem>
					) : (
						notifications
							.filter((not) => !not.isRead)
							.reverse()
							.map((notification) => {
								const title = notification.content.split(
									"\n",
									1
								)[0];
								return (
									<Link href="/notification" legacyBehavior>
										<ListItem
											key={notification.id}
											alignItems="flex-start"
											sx={{
												cursor: "pointer",
											}}
										>
											<ListItemText
												primary={title}
												secondary={
													notification.createDate
												}
											/>
										</ListItem>
									</Link>
								);
							})
					)}
				</List>
			</Popover>
		</>
	);
}

export default (props: { title: string; PageAction; repo: string }) => {
	const { title, PageAction, repo } = props;

	const { sidebar, setSidebar } = useSidebar();

	const hidden = useMediaQuery((theme: Theme) =>
		theme.breakpoints.down("sm")
	);

	return (
		<ElevationScroll {...props}>
			<AppBar
				color="secondary"
				position="fixed"
				sx={{
					zIndex: (theme) => theme.zIndex.drawer + 1,
				}}
			>
				<Toolbar
					sx={{
						bgcolor: (theme) => theme.palette.background.default,
						justifyContent: "space-between",
					}}
				>
					<IconButton
						edge="start"
						size="large"
						aria-label="Toggle drawer"
						onClick={() => setSidebar(!sidebar)}
					>
						<MenuTwoToneIcon />
					</IconButton>

					<Link href="/" legacyBehavior>
						<Typography
							component="span"
							variant="h6"
							color="textPrimary"
							sx={{
								cursor: "pointer",
							}}
						>
							Geekits
						</Typography>
					</Link>
					<Typography
						color="primary"
						variant="h6"
						noWrap
						sx={{ overflow: "initial", marginLeft: ".4em" }}
					>
						{title}
					</Typography>

					<Box sx={{ flexGrow: 1 }} />

					{!hidden && (
						<IconButton edge="end" href={repo} size="large">
							<GitHub />
						</IconButton>
					)}

					<NotificationButton />

					{PageAction}
				</Toolbar>
			</AppBar>
		</ElevationScroll>
	);
};
