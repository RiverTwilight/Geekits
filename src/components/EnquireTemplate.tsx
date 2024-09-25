import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import axios from "../utils/axios";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import useInput from "../utils/Hooks/useInput";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const PREFIX = 'EnquireTemplate';

const classes = {
    input: `${PREFIX}-input`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
    {
        theme: Theme
    }
) => ({
    [`& .${classes.input}`]: {
        marginBottom: theme.spacing(2),
    }
}));

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
		window.showGlobalLoadingOverlay();
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
				window.hideGlobalLoadingOverlay();
			});
	};
	return (
        (<Root>
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
        </Root>)
    );
};

export default EnquireTemplate;
