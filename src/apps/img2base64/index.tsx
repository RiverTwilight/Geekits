import React, { useRef, useState } from "react";
import FilePicker from "@/components/FilePicker";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import OutlinedCard from "@/components/OutlinedCard";
import { IconButton } from "@mui/material";
import { ContentCopy } from "@mui/icons-material";
import handleCopy from "@/utils/copyToClipboard";

const Img2Base64: React.FC = () => {
	const [file, setFile] = useState("");
	const resContainer = useRef(null);

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
					backgroundImage: `url(${file})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					width: "100%",
					height: "200px",
					display: "flex",
					overflow: "hidden",
					justifyContent: "center",
					position: "relative",
				}}
			>
				{file && (
					<Box
						sx={{
							position: "absolute",
							top: 0,
							bottom: 0,
							right: 0,
							left: 0,
							background: "rgba(0,0,0,0.5)",
						}}
					></Box>
				)}
				<CardContent
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
					}}
				>
					<FilePicker
						enableDrag
						fileType="image/*"
						handleFileUpload={(file) => {
							resContainer.current.innerText = `${file.slice(
								0,
								500
							)}...`;

							setFile(file);
						}}
					></FilePicker>
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
				}}
			>
				<Box
					sx={{
						height: "200px",
						display: "flex",
						justifyContent: "space-between",
						padding: 2,
						overflow: "hidden",
					}}
				>
					<code
						ref={resContainer}
						style={{ whiteSpace: "pre-wrap", wordWrap: "anywhere" }}
					></code>
					<IconButton
						disabled={!file}
						onClick={() => handleCopy(file)}
					>
						<ContentCopy />
					</IconButton>
				</Box>
			</OutlinedCard>
		</Box>
	);
};

export default Img2Base64;
