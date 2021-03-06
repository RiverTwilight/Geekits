import React from "react";
import Loadable from "react-loadable";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		loading: {
			position: "absolute",
			left: "50%",
			top: "50%",
			transform: "translate(-50%,-50%)",
		},
	})
);

const Loading = (props: any) => {
	const classes = useStyles();
	if (props.pastDelay) {
		return (
			<div className={classes.loading}>
				<CircularProgress color="primary" />
			</div>
		);
	}
	return null;
};

export default (loader: any) => {
	return Loadable({
		loader,
		loading: Loading,
		delay: 500,
	});
};
