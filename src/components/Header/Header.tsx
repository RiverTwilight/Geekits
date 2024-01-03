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

export default (props: { title: string; PageAction }) => {
	const { title, PageAction } = props;

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
					}}
				>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={() =>
							store.dispatch({ type: "drawer/opened" })
						}
						sx={{ mr: 2, display: { sm: "none" } }}
					>
						<MenuTwoToneIcon />
					</IconButton>

					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<ListItem
							sx={{ display: { xs: "none", sm: "inherit" } }}
						>
							<ListItemAvatar>
								<Avatar
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
							/>
						</ListItem>

						<Typography
							color="primary"
							variant="h6"
							noWrap
							sx={{ overflow: "initial" }}
						>
							{title}
						</Typography>
					</Box>

					{PageAction && <PageAction />}
				</Toolbar>
				{/* <Divider /> */}
			</AppBar>
		</ElevationScroll>
	);
};
