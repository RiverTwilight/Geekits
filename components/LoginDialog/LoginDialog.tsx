import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { store as loginDialogStore } from "../../data/loginDialogState";
import LoginForm from "./LoginForm";

const useStyles = makeStyles(() =>
	createStyles({
		loginIcon: {
			"--icon-half-width": "50px",
			position: "absolute",
			transform: "translate(0,-70px)",
			marginLeft: "calc(50% - var(--icon-half-width))",
			width: "calc(var(--icon-half-width) * 2)",
		},
		dialog: {
			"& .MuiDialog-paper": {
				overflowY: "unset",
			},
		},
	})
);

export default () => {
	const [open, setOpen] = useState(true);
	const classes = useStyles();

	const handleClose = () => {
		loginDialogStore.dispatch({ type: "loginDialog/closed" });
	};

	loginDialogStore.subscribe(() =>
		setOpen(loginDialogStore.getState().value)
	);

	return (
		<Dialog className={classes.dialog} open={open} onClose={handleClose}>
			<img
				className={classes.loginIcon}
				alt="Login Logo"
				src="/logo/v2/android-icon-144x144.png"
			></img>
			<DialogTitle id="simple-dialog-title">加入云极客</DialogTitle>
			<DialogContent>
				<LoginForm />
			</DialogContent>
		</Dialog>
	);
};
