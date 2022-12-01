import React, { useState, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		loading: {
			position: "fixed",
			top: 0,
			width: "100%",
			zIndex: 1101,
		},
	})
);

const GlobalLoading = () => {
	const [loading, setLoading] = useState(false);
	const classes = useStyles();

	useEffect(() => {
		window.loadShow = () => {
			setLoading(true);
		};
		window.loadHide = () => {
			setLoading(false);
		};
	});

	if (loading) {
		return <LinearProgress color="primary" className={classes.loading} />;
	}
	return null;
};

export default GlobalLoading;
