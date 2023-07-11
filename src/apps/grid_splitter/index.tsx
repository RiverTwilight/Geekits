import JSZip from "jszip";
import React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { TransitionProps } from "@mui/material/transitions";

import FileField from "@/components/FileField";
import FilePicker from "@/components/FilePicker";
import { dataURLtoFile, saveFile } from "@/utils/fileSaver";
import { isSameOrigin } from "@/utils/checkOrigin";
import splitToNineGrids from "./api";

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const Gallery = ({ res }: { res: string[] }) => {
	if (!res.length) return null;
	return (
		<Grid container spacing={3}>
			{res.map((a, i) => (
				<Grid item xs={4} key={i}>
					<Card>
						<CardMedia
							component="img"
							alt={`第${i}张照片`}
							image={a}
						/>
					</Card>
				</Grid>
			))}
		</Grid>
	);
};

type UiState = any;

const MicroCropper = ({ file, onCropperChange }) => {
	const iframeRef = React.useRef(null);

	React.useEffect(() => {
		const receiveMessage = (event) => {
			if (!isSameOrigin(event.origin)) return;

			if (event.data === "ready") {
				iframeRef.current.contentWindow.postMessage(file, "*");
			} else {
				onCropperChange(event.data);
			}
		};

		window.addEventListener("message", receiveMessage, false);

		return () => window.removeEventListener("message", receiveMessage);
	}, [file, onCropperChange]);

	return (
		<iframe
			ref={iframeRef}
			style={{
				border: "none",
				width: "100%",
				height: "100%",
				overflow: "hidden",
				display: "block",
			}}
			src="/_micro/Cropper"
		></iframe>
	);
};

class ImgSplit extends React.Component<{}, UiState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			file: null,
			res: [],
			cropperCache: null,
			dialogOpen: false,
		};
	}

	generate = () => {
		splitToNineGrids(this.state.cropperCache, (res) => {
			this.setState({
				res,
			});
			const zip = new JSZip();
			res.map((img: string, i: number) => {
				zip.file(i + 1 + ".png", dataURLtoFile(img, i + 1 + ".png"));
			});
			zip.generateAsync({
				type: "blob",
			}).then((content) => {
				saveFile({
					file: content,
					filename: "ygktool.img_split.zip",
					type: "zip",
				});
			});
		});
	};

	handleClose = () => {
		this.setState({
			dialogOpen: false,
		});
	};

	handleConfirm = () => {
		this.handleClose();
		this.setState({
			res: this.generate(),
		});
	};

	render() {
		const { file, dialogOpen, res } = this.state;
		return (
			<>
				<Box sx={{ display: "flex", justifyContent: "center" }}>
					<FileField>
						<FilePicker
							enableDrag={true}
							fileType="image/*"
							handleFileUpload={(file) => {
								this.setState({
									file,
									dialogOpen: true,
								});
							}}
						></FilePicker>
					</FileField>
				</Box>
				<Button
					disabled={file === null}
					onClick={this.generate}
					title="确定"
				/>
				<br></br>
				<Dialog
					TransitionComponent={Transition}
					fullScreen
					open={dialogOpen}
				>
					<AppBar sx={{ position: "relative" }}>
						<Toolbar>
							<IconButton
								edge="start"
								color="inherit"
								onClick={this.handleClose}
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
							<Button
								autoFocus
								color="inherit"
								onClick={this.handleConfirm}
							>
								使用照片
							</Button>
						</Toolbar>
					</AppBar>
					<MicroCropper
						file={file}
						onCropperChange={(newImg) => {
							this.setState({
								cropperCache: newImg,
							});
						}}
					/>
				</Dialog>
				<br></br>
				{res && <Gallery res={res} />}
			</>
		);
	}
}

export default ImgSplit;
