import * as React from "react";
import { Theme } from "@mui/material/styles";
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

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
                    size="large">
					<PhotoCamera className={classes.icon} />
				</IconButton>
			</label>
		</div>
    );
};

export default CenteredStyle;
