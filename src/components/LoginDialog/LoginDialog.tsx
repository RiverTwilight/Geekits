import Dialog from "@mui/material/Dialog";
import { styled } from '@mui/material/styles';
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { TabPanel } from "../TabToolkits";
import React, { useState } from "react";
import { store as loginDialogStore } from "../../data/loginDialogState";
import LoginForm from "./LoginForm";

const PREFIX = 'LoginDialog';

const classes = {
    loginIcon: `${PREFIX}-loginIcon`,
    dialog: `${PREFIX}-dialog`
};

const StyledDialog = styled(Dialog)(() =>
	({
        [`& .${classes.loginIcon}`]: {
			"--icon-half-width": "50px",
			position: "absolute",
			transform: "translate(0,-70px)",
			marginLeft: "calc(50% - var(--icon-half-width))",
			width: "calc(var(--icon-half-width) * 2)",
		},

        [`&.${classes.dialog}`]: {
			"& .MuiDialog-paper": {
				overflowY: "unset",
			},
		}
    }));

export default function () {
	const [open, setOpen] = useState(true);


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
        <StyledDialog className={classes.dialog} open={open} onClose={handleClose}>
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
		</StyledDialog>
    );
}
