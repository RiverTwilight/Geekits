import * as React from "react";
import {
	withStyles,
	createStyles,
	makeStyles,
	Theme,
} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

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

const NormalStyle = ({ fileType, handleReadFile }: any) => {
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
				<Button
					className={classes.button}
					aria-label="upload picture"
					variant="contained"
					color="primary"
					component="span"
				>
					上传文件
				</Button>
			</label>
		</div>
	);
};

export default NormalStyle;
