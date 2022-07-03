import React from "react";
import { useTheme, Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";

const drawerWidth = 260;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		toolbar: theme.mixins.toolbar,
		drawer: {
			width: drawerWidth,
			flexShrink: 0,
		},
		drawerPaper: {
			zIndex: 100,
			width: drawerWidth,
		},
		drawerContainer: {
			overflow: "auto",
		},
	})
);

const RightDrawer: React.FC<{
	open?: boolean;
	onClose?: () => void;
	children?: React.ReactNode;
}> = ({ children, open, onClose }) => {
	const classes = useStyles();
	const theme = useTheme();
	const hidden = useMediaQuery(theme.breakpoints.up("sm"));

	// console.log(`Is Hidden: %s, Drawer State: %s`, hidden, open);

	return (
		<>
			<Box
				component="nav"
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
				aria-label="mailbox folders"
			>
				<Drawer
					variant="temporary"
					anchor="right"
					open={!open}
					onClose={onClose}
					classes={{
						paper: classes.drawerPaper,
					}}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
				>
					<Box
						sx={{
							display: { xl: "block", sm: "none", xs: "none" },
						}}
					>
						<div className={classes.toolbar} />
					</Box>

					<div className={classes.drawerContainer}>{children}</div>
				</Drawer>
				<Drawer
					classes={{
						paper: classes.drawerPaper,
					}}
					anchor="right"
					variant="persistent"
					open={open}
					sx={{
						display: { xs: "none", sm: "block" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
				>
					<div className={classes.toolbar} />
					<div className={classes.drawerContainer}>{children}</div>
				</Drawer>
			</Box>
		</>
	);
};

export default RightDrawer;
