import React, { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { TransitionProps } from "@mui/material/transitions";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import { isSameOrigin } from "@/utils/checkOrigin";
import { isWeb } from "@/utils/platform";

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const MicroCropper = ({ file, onConfirm, onCancel, open }) => {
	const iframeRef = React.useRef(null);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

	React.useEffect(() => {
		const receiveMessage = async (event) => {
			if (!isSameOrigin(event.origin)) return;

			if (event.data.type === "ready") {
				console.log("ready", file);
				iframeRef.current.contentWindow.postMessage(
					{ type: "SEND_RAW", data: file },
					"*"
				);
			} else if (event.data.type === "SEND_RESULT") {
				onConfirm(event.data.data);
			}
		};

		window.addEventListener("message", receiveMessage, false);

		return () => window.removeEventListener("message", receiveMessage);
	}, [file]);

	const handleConfirm = () => {
		iframeRef.current.contentWindow.postMessage(
			{ type: "REQUEST_RESULT" },
			"*"
		);
	};

	return (
		<Dialog 
			TransitionComponent={Transition} 
			open={open} 
			fullScreen={fullScreen}
			maxWidth="md"
			fullWidth
		>
			<AppBar
				sx={{
					position: "relative",
					paddingTop: fullScreen ? "var(--ion-safe-area-top)" : 0,
				}}
			>
				<Toolbar>
					<IconButton
						edge="start"
						color="inherit"
						onClick={onCancel}
						aria-label="close"
					>
						<CloseIcon />
					</IconButton>
					<Typography
						sx={{ ml: 2, flex: 1 }}
						variant="h6"
						component="div"
					>
						裁剪
					</Typography>
					<Button autoFocus color="inherit" onClick={handleConfirm}>
						使用照片
					</Button>
				</Toolbar>
			</AppBar>
			<iframe
				ref={iframeRef}
				style={{
					border: "none",
					width: "100%",
					height: fullScreen ? "100%" : "calc(100vh - 200px)",
					overflow: "hidden",
					display: "block",
				}}
				src={isWeb() ? "/_micro/Cropper" : "/_micro/Cropper.html"}
			></iframe>
		</Dialog>
	);
};

export default MicroCropper;
