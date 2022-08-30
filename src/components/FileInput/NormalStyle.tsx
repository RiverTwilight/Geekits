import * as React from "react";
import { Theme } from "@mui/material/styles";
import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

const useStyles = makeStyles((theme: Theme) => {
	return createStyles({
		input: {
			display: "none",
		},
		container: {},
		button: {},
		icon: {
			width: "40px",
			height: "40px",
			color: "white",
		},
	});
});

const NormalStyle = ({
	fileType,
	text,
	icon,
	handleReadFile,
	...props
}: any) => {
	const classes = useStyles();
	return (
		<div className={classes.container}>
			<input
				accept={fileType}
				id="contained-button-file"
				onInput={handleReadFile}
				type="file"
				className={classes.input}
				{...props}
			/>
			<label htmlFor="contained-button-file">
				<Button
					className={classes.button}
					aria-label="upload picture"
					variant="contained"
					color="primary"
					component="span"
					startIcon={icon}
				>
					{text}
				</Button>
			</label>
		</div>
	);
};

export default NormalStyle;
