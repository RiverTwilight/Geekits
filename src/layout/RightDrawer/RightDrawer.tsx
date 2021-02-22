import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
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
	return (
		<Drawer
			anchor="right"
			className={classes.drawer}
			open={open}
			onClose={onClose}
			classes={{
				paper: classes.drawerPaper,
			}}
		>
			<div className={classes.drawerContainer}>{children}</div>
		</Drawer>
	);
};

export default RightDrawer;
