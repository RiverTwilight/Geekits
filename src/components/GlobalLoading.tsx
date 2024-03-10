import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import LinearProgress from "@mui/material/LinearProgress";

const PREFIX = "GlobalLoading";

const classes = {
	loading: `${PREFIX}-loading`,
};

const StyledLinearProgress = styled(LinearProgress)(({ theme: Theme }) => ({
	[`&.${classes.loading}`]: {
		position: "fixed",
		top: 0,
		width: "100%",
		zIndex: 1101,
	},
}));

const GlobalLoading = () => {
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		window.loadShow = () => {
			setLoading(true);
		};
		window.loadHide = () => {
			setLoading(false);
		};
	});

	if (loading) {
		return (
			<StyledLinearProgress color="primary" className={classes.loading} />
		);
	}
	return null;
};

export default GlobalLoading;
