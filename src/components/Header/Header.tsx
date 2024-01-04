import React from "react";
import Avatar from "@mui/material/Avatar";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { store } from "@/utils/Data/drawerState";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import {
	GitHub,
	MessageOutlined,
	MessageRounded,
	SettingsApplicationsRounded,
	SettingsRounded,
} from "@mui/icons-material";
import Link from "next/link";

function ElevationScroll(props: Props) {
	const { children } = props;

	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
	});

	return React.cloneElement(children, {
		elevation: trigger ? 4 : 0,
		sx: {
			borderBottom: trigger ? "" : "none",
		},
	});
}

interface Props {
	children: React.ReactElement;
}

export default (props: { title: string; PageAction; repo: string }) => {
	const { title, PageAction, repo } = props;

	return (
		<ElevationScroll {...props}>
			<AppBar
				color="secondary"
				position="fixed"
				sx={{
					zIndex: (theme) => theme.zIndex.drawer + 1,
					// mr: { sm: `${rightDrawerWidth}px` },
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
						aria-label="open drawer"
						onClick={() =>
							store.dispatch({ type: "drawer/toggle" })
						}
					>
						<MenuTwoToneIcon />
					</IconButton>

					<Link href={"/"} legacyBehavior>
						<Typography
							component="span"
							variant="h6"
							color="textPrimary"
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

					<IconButton
						edge="end"
						href={repo}
						size="large"
						sx={{ display: { xs: "none" } }}
					>
						<GitHub />
					</IconButton>
					{PageAction && <PageAction />}
				</Toolbar>
				{/* <Divider /> */}
			</AppBar>
		</ElevationScroll>
	);
};
