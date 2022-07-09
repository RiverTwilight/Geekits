import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { TabPanel } from "../TabToolkits";
import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";
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

export default function () {
	const [open, setOpen] = useState(true);
	const classes = useStyles();

	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
	};

	const handleClose = () => {
		loginDialogStore.dispatch({ type: "loginDialog/closed" });
	};

	loginDialogStore.subscribe(() =>
		setOpen(loginDialogStore.getState().value)
	);

	return (
		<Dialog className={classes.dialog} open={open} onClose={handleClose}>
			<Tabs
				value={value}
				onChange={handleChange}
				indicatorColor="primary"
				textColor="primary"
				variant="fullWidth"
				aria-label="full width tabs example"
			>
				<Tab label="注册" />
				<Tab label="登录" />
			</Tabs>
			<TabPanel value={value} index={0}>
				<LoginForm />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<p>d</p>
			</TabPanel>
		</Dialog>
	);
}
