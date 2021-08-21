import React from "react";
import {
	createStyles,
	useTheme,
	Theme,
	makeStyles,
} from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";

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

const RightDrawer = ({
	children,
	open,
	onClose,
}: {
	open?: boolean;
	onClose?: () => void;
	children?: React.ReactNode;
}) => {
	const classes = useStyles();
	const theme = useTheme();

	return (
		<>
			<Drawer
				variant="temporary"
				anchor="right"
				open={!open}
				onClose={onClose}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<Hidden xsDown>
					<div className={classes.toolbar} />
				</Hidden>

				<div className={classes.drawerContainer}>{children}</div>
			</Drawer>

			<Hidden xsDown implementation="css">
				<Drawer
					classes={{
						paper: classes.drawerPaper,
					}}
					anchor="right"
					variant="persistent"
					open={open}
				>
					<div className={classes.toolbar} />
					<div className={classes.drawerContainer}>{children}</div>
				</Drawer>
			</Hidden>
		</>
	);
};

export default RightDrawer;
