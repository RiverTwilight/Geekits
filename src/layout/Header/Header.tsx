import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import clsx from "clsx";

function ElevationScroll(props: Props) {
	const { children, window } = props;
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
		target: window ? window() : undefined,
	});

	return React.cloneElement(children, {
		elevation: trigger ? 4 : 0,
	});
}

interface Props {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window?: () => Window;
	children: React.ReactElement;
}

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		title: {
			flexGrow: 1,
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
	})
);

export default (props: any) => {
	const { handleLeftDrawerOpen, open } = props;
	const classes = useStyles();
	const [auth, setAuth] = React.useState(true);

	return (
		<ElevationScroll {...props}>
			<AppBar
				position="fixed"
				color="inherit"
				className={clsx(classes.appBar)}
			>
				<Toolbar>
					<IconButton
						color="primary"
						aria-label="open drawer"
						onClick={handleLeftDrawerOpen}
						edge="start"
						className={classes.menuButton}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						color="primary"
						variant="h6"
						className={classes.title}
					>
						云极客工具
					</Typography>
				</Toolbar>
			</AppBar>
		</ElevationScroll>
	);
};
