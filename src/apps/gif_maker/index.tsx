import React, { useState, useRef } from "react";
import {
	Box,
	Button,
	Container,
	Fab,
	LinearProgress,
	Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import SettingsIcon from "@mui/icons-material/Settings";
import { GifConfig } from "./types";
import { SettingsDialog } from "./components/SettingsDialog";
import { FileUploader } from "./components/FileUploader";
import { Preview } from "./components/Preview";
import { ImageGallery } from "./components/ImageGallery";
import { createGifFromImages, createGifFromVideo } from "./utils/gifUtils";

export default function GifMaker() {
	const [assets, setAssets] = useState<string[]>([]);
	const [videoFile, setVideoFile] = useState<string>("");
	const [type, setType] = useState<"image" | "video">("image");
	const [config, setConfig] = useState<GifConfig>({
		height: null,
		width: null,
		quality: 10,
		delay: 0.1,
	});
	const [progress, setProgress] = useState(0);
	const [status, setStatus] = useState("");
	const [result, setResult] = useState<string>();
	const [openSettings, setOpenSettings] = useState(false);

	const videoRef = useRef<HTMLVideoElement>(null);

	const handleImageUpload = (file: string) => {
		setAssets((prev) => [...prev, file]);
		setType("image");
	};

	const handleVideoUpload = (file: string) => {
		setVideoFile(file);
		setType("video");
	};

	const handleDeleteImage = (index: number) => {
		setAssets((prev) => prev.filter((_, i) => i !== index));
	};

	const handleCreateGif = async () => {
		const updateProgress = (state: string, process: number) => {
			setStatus(state);
			setProgress(process);
		};

		if (type === "image") {
			const result = await createGifFromImages(
				assets,
				config,
				updateProgress
			);
			setResult(result);
		} else if (type === "video" && videoRef.current) {
			const result = await createGifFromVideo(
				videoFile,
				config,
				updateProgress,
				videoRef.current
			);
			setResult(result);
		}
	};

	return (
		<Container maxWidth="md">
			<Box sx={{ py: 4 }}>
				<ImageGallery assets={assets} onDelete={handleDeleteImage} />

				<Box
					sx={{
						display: "flex",
						gap: 2,
						my: 3,
						alignItems: "center",
					}}
				>
					<FileUploader
						accept="image/*"
						multiple
						onUpload={handleImageUpload}
						label="Choose Images"
					/>

					<Typography variant="body1">or</Typography>

					<FileUploader
						accept="video/*"
						onUpload={handleVideoUpload}
						label="Choose Video"
					/>

					<Button
						onClick={() => setOpenSettings(true)}
						startIcon={<SettingsIcon />}
					>
						Settings
					</Button>
				</Box>

				{status && (
					<Box sx={{ my: 2 }}>
						<Typography>{status}</Typography>
						{progress > 0 && (
							<LinearProgress
								variant="determinate"
								value={progress * 100}
								sx={{ mt: 1 }}
							/>
						)}
					</Box>
				)}

				<Preview src={result} />

				<Fab
					color="primary"
					sx={{ position: "absolute", bottom: 16 }}
					onClick={handleCreateGif}
				>
					<CheckIcon />
				</Fab>

				<SettingsDialog
					open={openSettings}
					onClose={() => setOpenSettings(false)}
					onSave={(newConfig) => {
						setConfig(newConfig);
						setOpenSettings(false);
					}}
				/>

				<video
					ref={videoRef}
					style={{ display: "none" }}
					src={videoFile}
				/>
			</Box>
		</Container>
	);
}
