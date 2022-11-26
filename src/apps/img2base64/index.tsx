import React, { useEffect, useState } from "react";
import ClipboardJS from "clipboard";
import FilePicker from "@/components/FilePicker";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AddIcon from "@mui/icons-material/Add";

const Img2Base64: React.FC = (props) => {
	const [file, setFile] = useState("");

	useEffect(() => {
		clipboard && clipboard.destroy();
		var clipboard = new ClipboardJS("#copy");
		clipboard.on("success", (e) => {
			window.snackbar({ message: "已复制" });
			e.clearSelection();
		});
		clipboard.on("error", (e) => {
			window.snackbar({ message: "文本太长无法复制" });
			e.clearSelection();
		});
	}, []);

	return (
		<>
			<Box
				component="div"
				sx={{
					display: "flex",
					minWidth: "500px",
					maxWidth: "900px",
				}}
			>
				<Card
					component={Paper}
					sx={{
						backgroundImage: `url(${file})`,
						backgroundSize: "cover",
						backgroundRepeat: "no-repeat",
						backgroundPosition: "center",
						// filter: "blur(2px)",
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
							handleFileUpload={(file) => {
								setFile(file);
							}}
						></FilePicker>
					</CardContent>
				</Card>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						flexDirection: "column",
						padding: "0 20px",
					}}
				>
					<ArrowForwardIcon />
				</Box>
				<TextField
					sx={{
						height: "200px",
					}}
					multiline
					rows={7}
					data-clipboard-text={file}
					value={file}
				/>
			</Box>

			{/* <Button id="copy" hidden={file !== ""}>
				复制
			</Button> */}
		</>
	);
};

export default Img2Base64;
