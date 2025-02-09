import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { IconButton, TextField, Typography } from "@mui/material";
import { saveFile } from "@/utils/fileSaver";
// Import specific icons instead of all
import {
	Home,
	Settings,
	Person,
	Favorite,
	Star,
	Search,
	Mail,
	Phone,
	Camera,
	Edit,
	Delete,
	Add,
	Close,
	Menu,
	Share,
	Download,
	Upload,
	Save,
	Print,
	Help,
} from "@mui/icons-material";

const IconGenerator: React.FC = () => {
	const [selectedIcon, setSelectedIcon] = useState<string>("Home");
	const [customIconName, setCustomIconName] = useState<string>("");
	const [iconColor, setIconColor] = useState<string>("FFFFFF");
	const [bgColor1, setBgColor1] = useState<string>("4CAF50");
	const [bgColor2, setBgColor2] = useState<string>("2196F3");
	const [generatedUrl, setGeneratedUrl] = useState<string>("");

	// Define available icons map
	const iconsMap = {
		Home,
		Settings,
		Person,
		Favorite,
		Star,
		Search,
		Mail,
		Phone,
		Camera,
		Edit,
		Delete,
		Add,
		Close,
		Menu,
		Share,
		Download,
		Upload,
		Save,
		Print,
		Help,
	};

	const handleGenerate = () => {
		const url = `/api/icon?iconName=${selectedIcon}&iconColor=${iconColor}&backgroundColor1=${bgColor1}&backgroundColor2=${bgColor2}`;
		setGeneratedUrl(url);
	};

	const handleDownload = async () => {
		try {
			const response = await fetch(generatedUrl);
			const blob = await response.blob();
			saveFile({
				file: blob,
				filename: `${selectedIcon}_icon.png`,
				type: "png",
			});
		} catch (error) {
			console.error("Error downloading icon:", error);
		}
	};

	return (
		<Box sx={{ p: 3 }}>
			<Box sx={{ mb: 4 }}>
				<Typography variant="h5" gutterBottom>
					Icon Gallery
				</Typography>
				<Grid
					container
					spacing={1}
					sx={{ maxHeight: "200px", overflow: "auto" }}
				>
					{Object.entries(iconsMap).map(([iconName, Icon]) => (
						<Grid item key={iconName}>
							<IconButton
								onClick={() => setSelectedIcon(iconName)}
								sx={{
									bgcolor:
										selectedIcon === iconName
											? "primary.main"
											: "transparent",
									color:
										selectedIcon === iconName
											? "white"
											: "inherit",
								}}
							>
								<Icon />
							</IconButton>
						</Grid>
					))}
				</Grid>
			</Box>

			<Box sx={{ mb: 4 }}>
				<Typography variant="h6" gutterBottom>
					Custom Icon Name
				</Typography>
				<TextField
					value={customIconName}
					onChange={(e) => {
						setCustomIconName(e.target.value);
						setSelectedIcon(e.target.value);
					}}
					placeholder="Enter MUI icon name (e.g., AccessAlarm)"
					size="small"
					fullWidth
					sx={{ mb: 2 }}
				/>
				<Typography variant="caption" display="block" gutterBottom>
					View all available icons at{" "}
					<a
						href="https://mui.com/material-ui/material-icons/"
						target="_blank"
						rel="noopener noreferrer"
					>
						Material UI Icons
					</a>
				</Typography>
			</Box>

			<Box sx={{ mb: 4 }}>
				<Typography variant="h6" gutterBottom>
					Customize Colors
				</Typography>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={4}>
						<Typography>Icon Color</Typography>
						<TextField
							value={iconColor}
							onChange={(e) => setIconColor(e.target.value)}
							placeholder="FFFFFF"
							size="small"
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} sm={4}>
						<Typography>Background Color 1</Typography>
						<TextField
							value={bgColor1}
							onChange={(e) => setBgColor1(e.target.value)}
							placeholder="4CAF50"
							size="small"
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} sm={4}>
						<Typography>Background Color 2</Typography>
						<TextField
							value={bgColor2}
							onChange={(e) => setBgColor2(e.target.value)}
							placeholder="2196F3"
							size="small"
							fullWidth
						/>
					</Grid>
				</Grid>
			</Box>

			<Box sx={{ mb: 4 }}>
				<Button
					variant="contained"
					onClick={handleGenerate}
					sx={{ mr: 2 }}
				>
					Generate Icon
				</Button>
				{generatedUrl && (
					<Button variant="outlined" onClick={handleDownload}>
						Download PNG
					</Button>
				)}
			</Box>

			{generatedUrl && (
				<Box sx={{ mb: 4 }}>
					<Typography variant="h6" gutterBottom>
						Preview
					</Typography>
					<Box sx={{ mb: 2 }}>
						<img
							src={generatedUrl}
							alt="Generated Icon"
							style={{ width: 200, height: 200 }}
						/>
					</Box>
					<TextField
						fullWidth
						value={`${window.location.origin}${generatedUrl}`}
						label="Direct URL"
						InputProps={{
							readOnly: true,
						}}
					/>
				</Box>
			)}
		</Box>
	);
};

export default IconGenerator;
