import React, { useState, useEffect } from "react";
import axios from "../utils/axios";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import useInput from "../utils/Hooks/useInput";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

/**
 * 查询工具模板
 */

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		input: {
			marginBottom: theme.spacing(2),
		},
	})
);

const EnquireTemplate = (props: {
	Result: any;
	api: string;
	readonly inputOpt?: any;
	readonly btnText?: string;
}) => {
	const { api, Result, btnText } = props;
	const [text, setText] = useInput("");
	const [data, setData] = useState(null);
	const [openSb, setOpenSb] = React.useState(false);
	const classes = useStyles();

	const handleEnterKeydown = (e: {
		ctrlKey: any;
		keyCode: number;
		preventDefault: () => void;
	}) => {
		if (e.keyCode === 13) {
			e.preventDefault();
			connectWithServer();
		}
	};

	const handleClick = () => {
		connectWithServer();
	};

	const handleClose = () => {
		setOpenSb(false);
	};

	useEffect(() => {
		window.addEventListener("keydown", handleEnterKeydown);
		return () => {
			window.removeEventListener("keydown", handleEnterKeydown);
		};
	});

	const connectWithServer = () => {
		window.loadShow();
		axios({
			method: "get",
			url: api + text,
			withCredentials: false,
		})
			.then((response) => {
				var json = JSON.parse(response.request.response);
				setData(json);
			})
			.catch((error) => {
				setOpenSb(true);
			})
			.then(() => {
				window.loadHide();
			});
	};
	return (
		<>
			<FormControl className={classes.input} fullWidth>
				<InputLabel htmlFor="standard-adornment-amount">
					搜索（Ctrl+F）
				</InputLabel>
				<Input
					id="standard-adornment-amount"
					value={text}
					onChange={setText}
				/>
			</FormControl>
			<Button variant="contained" color="primary" onClick={handleClick}>
				{btnText || "查询"}
			</Button>
			<Snackbar
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
				open={openSb}
				autoHideDuration={6000}
				onClose={handleClose}
				message="Note archived"
				action={
					<React.Fragment>
						<Button
							color="secondary"
							size="small"
							onClick={handleClose}
						>
							UNDO
						</Button>
						<IconButton
							size="small"
							aria-label="close"
							color="inherit"
							onClick={handleClose}
						>
							<CloseIcon fontSize="small" />
						</IconButton>
					</React.Fragment>
				}
			/>
			<br></br>
			{/* <Result data={this.state.data} input={input} /> */}
		</>
	);
};

export default EnquireTemplate;
