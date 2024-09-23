import React, { useRef, useState } from "react";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import OutlinedCard from "@/components/OutlinedCard";
import { IconButton, TextField, Button } from "@mui/material";
import { ContentCopy } from "@mui/icons-material";
import handleCopy from "@/utils/copyToClipboard";

const Base64ToImg: React.FC = () => {
	const [base64Input, setBase64Input] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const imgRef = useRef<HTMLImageElement>(null);

	const handleConvert = () => {
		try {
			const trimmedInput = base64Input.trim();
			const img = trimmedInput.startsWith("data:image")
				? trimmedInput
				: `data:image/png;base64,${trimmedInput}`;
			setImageUrl(img);
		} catch (error) {
			console.error("Invalid base64 input", error);
			setImageUrl("");
		}
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: {
					xs: "column",
					md: "row",
				},
				justifyContent: "center",
				alignItems: "center",
				width: "100%",
			}}
		>
			<OutlinedCard
				style={{
					width: "100%",
				}}
			>
				<CardContent>
					<TextField
						fullWidth
						multiline
						rows={4}
						variant="outlined"
						label="Base64 Input"
						value={base64Input}
						onChange={(e) => setBase64Input(e.target.value)}
					/>
					<Button
						variant="contained"
						color="primary"
						onClick={handleConvert}
						sx={{ mt: 2 }}
					>
						Convert
					</Button>
				</CardContent>
			</OutlinedCard>
			<Box
				sx={{
					transform: {
						xs: "rotate(90deg)",
						md: "rotate(0deg)",
					},
					padding: "20px",
				}}
			>
				<ArrowForwardIcon />
			</Box>
			<OutlinedCard
				style={{
					width: "100%",
					height: "200px",
				}}
			>
				<Box
					sx={{
						height: "100%",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						position: "relative",
					}}
				>
					{imageUrl && (
						<>
							<img
								ref={imgRef}
								src={imageUrl}
								alt="Converted image"
								style={{
									maxWidth: "100%",
									maxHeight: "100%",
									objectFit: "contain",
								}}
							/>
							<IconButton
								sx={{
									position: "absolute",
									top: 8,
									right: 8,
								}}
								onClick={() => handleCopy(imageUrl)}
							>
								<ContentCopy />
							</IconButton>
						</>
					)}
				</Box>
			</OutlinedCard>
		</Box>
	);
};

export default Base64ToImg;
