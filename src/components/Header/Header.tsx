import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { store } from "@/utils/Data/drawerState";

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

const drawerWidth = 240;

export default (props: { title: string; PageAction }) => {
	const { title, PageAction } = props;

	return (
		<ElevationScroll {...props}>
			<AppBar
				color="secondary"
				position="fixed"
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
					zIndex: (theme) => theme.zIndex.drawer + 1,
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
