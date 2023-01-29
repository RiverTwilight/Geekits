import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { store } from "../../data/drawerState";

function ElevationScroll(props: Props) {
	const { children } = props;

	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
	});

	return React.cloneElement(children, {
		elevation: trigger ? 4 : 0,
	});
}

interface Props {
	children: React.ReactElement;
}

const [drawerWidth, rightDrawerWidth] = [240, 260];

export default (props: { title: string; PageAction }) => {
	const { title, PageAction } = props;

	return (
		<ElevationScroll {...props}>
			<AppBar
				position="fixed"
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
					zIndex: (theme) => theme.zIndex.drawer + 1
					// mr: { sm: `${rightDrawerWidth}px` },
				}}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={() =>
							store.dispatch({ type: "drawer/opened" })
						}
						edge="start"
						sx={{ mr: 2, display: { sm: "none" } }}
					>
						<MenuTwoToneIcon />
					</IconButton>

					<Typography
						color="primary"
						variant="h6"
						noWrap
						component="div"
					>
						{title}
					</Typography>

					{PageAction && <PageAction />}
				</Toolbar>
				<Divider />
			</AppBar>
		</ElevationScroll>
	);
};
