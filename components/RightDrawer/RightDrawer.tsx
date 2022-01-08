import React from "react";
import { useTheme, Theme } from "@mui/material/styles";
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import Hidden from "@mui/material/Hidden";
import Drawer from "@mui/material/Drawer";

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

	return <>
        <Drawer
            variant="temporary"
            anchor="right"
            open={!open}
            onClose={onClose}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <Hidden smDown>
                <div className={classes.toolbar} />
            </Hidden>

            <div className={classes.drawerContainer}>{children}</div>
        </Drawer>

        <Hidden smDown implementation="css">
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
    </>;
};

export default RightDrawer;
