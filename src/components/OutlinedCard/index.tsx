import React from "react";
import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";
import { Theme } from "@mui/material/styles";
import clsx from "clsx";

/**
 * Outlined Card
 * @author rivertwilight
 */

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			border: {
				light: "1px solid #e0e0e0",
				dark: "1px solid rgba(255, 255, 255, 0.23)",
			}[theme.palette.mode],
			borderRadius: "8px",
		},
	})
);

const OutlinedCard = ({
	children,
	padding,
	className,
}: {
	children?: JSX.Element | JSX.Element[];
	/**将获得10的倍数 Padding */
	padding?: number;
}) => {
	const classes = useStyles();
	return (
		<div
			className={clsx(className, classes.root)}
			style={{ padding: padding ? `${padding * 10}px` : 0 }}
		>
			{children}
		</div>
	);
};

export default OutlinedCard;
