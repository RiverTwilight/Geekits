import React, { useEffect, useState } from "react";
import ClipboardJS from "clipboard";
import FilePicker from "@/components/FilePicker";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AddIcon from "@mui/icons-material/Add";
import Compress from "compress.js";

const Img2Base64: React.FC = (props) => {
	const [compressedImage, setCompressedImage] = useState(null);
	const [compressedPercent, setcompressedPercent] = useState(0);
	const compress = new Compress();

	const handleImageChange = (base64, file) => {
		compress
			.compress([file], {
				size: 4, // the max size in MB, defaults to 2MB
				quality: 0.75, // the quality of the image, max is 1,
				maxWidth: 1920, // the max width of the output image, defaults to 1920px
				maxHeight: 1920, // the max height of the output image, defaults to 1920px
				resize: true, // defaults to true, set false if you do not want to resize the image width and height
			})
			.then((results) => {
				console.log(results);
				const img = results[0];
				setcompressedPercent(img.sizeReducedInPercent);
				setCompressedImage(img.prefix + img.data);
			});
	};

	return (
		<>
			<Box
				component="div"
				sx={{
					minWidth: "300px",
					maxWidth: "900px",
				}}
			>
				<Box sx={{ display: "flex", justifyContent: "center" }}>
					<Card
						component={Paper}
						sx={{
							width: "200px",
							height: "200px",
							display: "flex",
							justifyContent: "center",
						}}
					>
						<CardContent
							sx={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
							}}
						>
							<FilePicker
								readByDrag
								fileType="image/*"
								handleFileUpload={handleImageChange}
							></FilePicker>
						</CardContent>
					</Card>
				</Box>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						padding: "40px 20px",
					}}
				>
					<ArrowForwardIcon sx={{ transform: "rotate(90deg)" }} />
				</Box>

				<Box
					sx={{
						maxWidth: "900px",
						maxHeight: "70vh",
						borderRadius: "6px",
					}}
				>
					{compressedImage && (
						<img width="100%" height="100%" src={compressedImage} />
					)}
					{compressedPercent > 0 && (
						<Typography align="center" variant="body1">
							图片大小减少了{Math.floor(compressedPercent * 100) / 100}%
						</Typography>
					)}
				</Box>
			</Box>
		</>
	);
};

export default Img2Base64;
