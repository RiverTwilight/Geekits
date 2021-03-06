import * as React from "react";
import { withStyles, createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

const useStyles = makeStyles((theme: Theme) => {
	return createStyles({
		input: {
			display: "none",
		},
		container: {
			position: "absolute",
			left: "50%",
			top: "50%",
			transform: "translate(-50%,-50%)",
		},
		button: {
			background: theme.palette.primary.main,
			"&:hover, &.Mui-focusVisible": {
				backgroundColor: theme.palette.secondary.main,
			},
			width: "70px",
			height: "70px",
		},
		icon: {
			width: "40px",
			height: "40px",
			color: "white",
		},
	});
});

const CenteredStyle = ({
    fileType,
    handleReadFile,
}: any) => {
    const classes = useStyles();
	return (
		<div className={classes.container}>
			<input
				accept={fileType}
				id="contained-button-file"
				multiple
				onInput={handleReadFile}
				type="file"
				className={classes.input}
			/>
			<label htmlFor="contained-button-file">
				<IconButton
					className={classes.button}
					aria-label="upload picture"
					component="span"
				>
					<PhotoCamera className={classes.icon} />
				</IconButton>
			</label>
		</div>
	);
};

export default CenteredStyle;
