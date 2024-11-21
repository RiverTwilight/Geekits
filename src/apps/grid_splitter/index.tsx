import JSZip from "jszip";
import React, { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";

import FileField from "@/components/FileField";
import FilePicker from "@/components/FilePicker";
import { dataURLtoFile, saveFile } from "@/utils/fileSaver";
import splitToNineGrids from "./api";
import MicroCropper from "@/components/MicroCropper";
import { IconButton } from "@mui/material";
import { Download } from "@mui/icons-material";

const Gallery = ({ res }: { res: string[] }) => {
	if (!res.length) return null;
	return (
		<Grid container spacing={2}>
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

const ImgSplit: React.FC = () => {
	const [file, setFile] = useState<string | null>(null);
	const [res, setRes] = useState<string[]>([]);
	const [dialogOpen, setDialogOpen] = useState(false);

	const generate = (cropperCache) => {
		if (cropperCache) {
			splitToNineGrids(cropperCache, (res) => {
				setRes(res);
			});
		}
	};

	const handleDonwload = () => {
		const zip = new JSZip();

		res.map((img: string, i: number) => {
			zip.file(i + 1 + ".png", dataURLtoFile(img, i + 1 + ".png"));
		});
		zip.generateAsync({ type: "blob" }).then((content) => {
			saveFile({
				file: content,
				filename: "geekits.img_split.zip",
				type: "zip",
			});
		});
	};

	const handleClose = () => {
		setDialogOpen(false);
		setFile(null);
	};

	return (
		<>
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<FileField>
					<FilePicker
						enableDrag={true}
						fileType="image/*"
						handleFileUpload={(_, file) => {
							if (file) {
								const reader = new FileReader();
								reader.onload = (e) => {
									setFile(e.target.result as string);
									setDialogOpen(true);
								};
								reader.readAsDataURL(file);
							}
						}}
					></FilePicker>
				</FileField>
			</Box>

			<br></br>

			{res.length > 0 && (
				<>
					<Gallery res={res} />
					<Box
						display={"flex"}
						justifyContent={"center"}
						marginTop={2}
					>
						<Button
							startIcon={<Download />}
							onClick={handleDonwload}
						>
							下载
						</Button>
					</Box>
				</>
			)}

			<MicroCropper
				file={file}
				open={dialogOpen}
				onConfirm={(croppedImg) => {
					setDialogOpen(false);
					generate(croppedImg);
				}}
				onCancel={handleClose}
			/>
		</>
	);
};

export default ImgSplit;
