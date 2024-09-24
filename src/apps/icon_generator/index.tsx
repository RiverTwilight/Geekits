import JSZip from "jszip";
import React, { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import FileField from "@/components/FileField";
import FilePicker from "@/components/FilePicker";
import { dataURLtoFile, saveFile } from "@/utils/fileSaver";
import {
	IconButton,
	Checkbox,
	FormControlLabel,
	FormGroup,
} from "@mui/material";
import { Download, FolderZipOutlined } from "@mui/icons-material";

const sizes = [16, 48, 64, 128, 256, 512];

const Gallery = ({ res }: { res: string[] }) => {
	if (!res.length) return null;
	return (
		<Grid container spacing={2}>
			{res.map((a, i) => (
				<Grid item xs={4} key={i}>
					<Card>
						<CardMedia
							component="img"
							alt={`Icon size ${sizes[i]}x${sizes[i]}`}
							image={a}
						/>
					</Card>
				</Grid>
			))}
		</Grid>
	);
};

const IconGenerator: React.FC = () => {
	const [file, setFile] = useState<File | null>(null);
	const [res, setRes] = useState<string[]>([]);
	const [selectedSizes, setSelectedSizes] = useState<number[]>(
		sizes.slice(0, 2)
	);

	const handleFileUpload = (_, file: File) => {
		const img = new Image();
		const objectUrl = URL.createObjectURL(file);
		img.src = objectUrl;
		img.onload = () => {
			if (img.width !== img.height) {
				alert("Image ratio must be 1:1");
				URL.revokeObjectURL(objectUrl);
				return;
			}
			setFile(file);
			const reader = new FileReader();
			reader.onload = (e) => {
				const dataURL = e.target.result as string;
				setRes([dataURL]);
			};
			reader.readAsDataURL(file);
		};
		img.onerror = () => {
			URL.revokeObjectURL(objectUrl);
			alert("Failed to load image");
		};
	};

	const resizeImage = (dataURL: string, size: number): Promise<string> => {
		return new Promise((resolve) => {
			const img = new Image();
			img.src = dataURL;
			img.onload = () => {
				const canvas = document.createElement("canvas");
				canvas.width = size;
				canvas.height = size;
				const ctx = canvas.getContext("2d");
				ctx?.drawImage(img, 0, 0, size, size);
				resolve(canvas.toDataURL("image/png"));
			};
		});
	};

	const handleGenerate = async () => {
		const resizedImages = await Promise.all(
			selectedSizes.map((size) => resizeImage(res[0], size))
		);
		setRes(resizedImages);
		handleDownload(resizedImages);
	};

	const handleDownload = (images: string[]) => {
		const zip = new JSZip();

		images.map((img: string, i: number) => {
			zip.file(
				`${selectedSizes[i]}x${selectedSizes[i]}.png`,
				dataURLtoFile(
					img,
					`${selectedSizes[i]}x${selectedSizes[i]}.png`
				)
			);
		});
		zip.generateAsync({ type: "blob" }).then((content) => {
			saveFile({
				file: content,
				filename: "icon_generator.zip",
				type: "zip",
			});
		});
	};

	const handleSizeChange = (size: number) => {
		setSelectedSizes((prev) =>
			prev.includes(size)
				? prev.filter((s) => s !== size)
				: [...prev, size]
		);
	};

	return (
		<>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					flexDirection: { xs: "column", sm: "column" },
					alignItems: "center",
					gap: 2,
				}}
			>
				<FileField>
					<FilePicker
						enableDrag={true}
						fileType="image/*"
						handleFileUpload={handleFileUpload}
					></FilePicker>
				</FileField>

				<Box>
					<Box
						sx={{
							justifyContent: "center",
							marginTop: { xs: 2, sm: 0 },
							marginLeft: { sm: 2 },
							display: "flex",
							flexWrap: "wrap",
							gap: 1,
						}}
					>
						{sizes.map((size) => (
							<Chip
								key={size}
								label={`${size}x${size}`}
								clickable
								color={
									selectedSizes.includes(size)
										? "primary"
										: "default"
								}
								onClick={() => handleSizeChange(size)}
							/>
						))}
					</Box>
					{res.length > 0 && (
						<Box
							display={"flex"}
							justifyContent={"center"}
							marginTop={2}
						>
							<Button onClick={handleGenerate}>Confirm</Button>
						</Box>
					)}
				</Box>
			</Box>
		</>
	);
};

export default IconGenerator;
