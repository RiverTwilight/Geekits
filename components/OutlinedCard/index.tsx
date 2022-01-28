import React from "react";
import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";
import { Theme } from "@mui/material/styles";

/**
 * Outlined Card
 * @author rivertwilight
 */

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			border: "1px solid #e0e0e0",
			borderRadius: "5px",
		},
	})
);

const OutlinedCard = ({
	children,
	padding,
}: {
	children?: JSX.Element | JSX.Element[];
	padding?: number;
}) => {
	const classes = useStyles();
	return (
		<div
			className={classes.root}
			style={{ padding: padding ? `${padding * 10}px` : 0 }}
		>
			<div>{children}</div>
		</div>
	);
};

export default OutlinedCard;
