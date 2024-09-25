import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

const PREFIX = "GlobalLoading";

const classes = {
	loading: `${PREFIX}-loading`,
	overlay: `${PREFIX}-overlay`,
};

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
	[`&.${classes.loading}`]: {
		position: "fixed",
		top: 0,
		width: "100%",
		zIndex: theme.zIndex.drawer + 2,
	},
}));

const StyledOverlay = styled(Box)(({ theme }) => ({
	[`&.${classes.overlay}`]: {
		position: "fixed",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		backgroundColor:
			theme.palette.mode === "dark"
				? "rgba(0, 0, 0, 0.5)"
				: "rgba(255, 255, 255, 0.5)",
		zIndex: theme.zIndex.drawer + 1,
	},
}));

const GlobalLoading = () => {
	const [loading, setLoading] = useState(false);
	const theme = useTheme();

	useEffect(() => {
		window.showGlobalLoadingOverlay = () => {
			setLoading(true);
		};
		window.hideGlobalLoadingOverlay = () => {
			setLoading(false);
		};

		return () => {
			delete window.hideGlobalLoadingOverlay;
			delete window.showGlobalLoadingOverlay;
		};
	}, []);

	if (loading) {
		return (
			<>
				<StyledLinearProgress
					color="primary"
					className={classes.loading}
				/>
				<StyledOverlay className={classes.overlay} />
			</>
		);
	}
	return null;
};

export default GlobalLoading;
