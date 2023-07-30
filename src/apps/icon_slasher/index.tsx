import { ReactSVG } from "react-svg";
import React, { useState, useEffect, useRef } from "react";
import { DOMParser, XMLSerializer } from "xmldom";
import SvgSlash from "./slash.svg";
import ReactDOMServer from "react-dom/server";
// The import of SvgSlash is different with the CRA]
// NextJS will import as a React Dom
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Compress from "compress.js";
import adaptiveBorder from "@/utils/adaptiveBorder";
import FileField from "@/components/FileField";
import FilePicker from "@/components/FilePicker";
import Grid from "@mui/material/Grid";

function IconSlasher() {
	const [svgFile, setSVGFile] = useState();
	const [svgSize, setSVGSize] = useState(100); // Default size
	const [showSlash, setShowSlash] = useState(true); // Default is to show slash

	const onFileChange = (_, file) => {
		setSVGFile(file);
	};

	const onSizeChange = (event) => {
		setSVGSize(event.target.value);
	};

	const onShowSlashChange = (event) => {
		setShowSlash(event.target.checked);
	};

	return (
		<div>
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
					}}
				>
					<FileField>
						<FilePicker
							enableDrag
							fileType="image/*"
							accept=".svg"
							handleFileUpload={onFileChange}
						></FilePicker>
					</FileField>

					<br />

					{svgFile && (
						<>
							<Grid container spacing={2} alignItems="center">
								<Grid item xs={12} sm={6}>
									<FormControl fullWidth>
										<TextField
											label="Size"
											type="number"
											placeholder="Size"
											value={svgSize}
											onChange={onSizeChange}
										/>
									</FormControl>
								</Grid>
								<Grid item xs={12} sm={6}>
									<FormControlLabel
										control={
											<Checkbox
												checked={showSlash}
												onChange={onShowSlashChange}
											/>
										}
										label="Show Slash"
									/>
								</Grid>
							</Grid>
							<br />
							<SVGDisplay
								svgFile={svgFile}
								size={svgSize}
								showSlash={showSlash}
							/>
						</>
					)}
				</Box>
			</Box>
		</div>
	);
}

function SVGDisplay({ svgFile, size, showSlash }) {
	const [updatedSVG, setUpdatedSVG] = useState<string>(null);
	const downloadLink = useRef();

	useEffect(() => {
		if (svgFile) {
			const reader = new FileReader();
			reader.onload = function (e) {
				const svgString = e.target.result;
				const parser = new DOMParser();
				const serializer = new XMLSerializer();
				const doc = parser.parseFromString(svgString, "image/svg+xml");
				const svgElement = doc.documentElement;

				svgElement.setAttribute("width", size);
				svgElement.setAttribute("height", size);

				if (showSlash) {
					// Load slash svg and append it to the uploaded SVG

					const slashString = ReactDOMServer.renderToString(
						<SvgSlash />
					);
					const slashDoc = parser.parseFromString(
						slashString,
						"image/svg+xml"
					);
					const importedNode = doc.importNode(
						slashDoc.documentElement,
						true
					);
					svgElement.appendChild(importedNode);

					// Serialize the updated SVG to a string and encode it to base64
					const updatedSVGString =
						serializer.serializeToString(svgElement);

					const base64String = encodeSVGDatauri(
						updatedSVGString,
						"base64"
					);

					setUpdatedSVG(`data:image/svg+xml;base64,${base64String}`);

					// Prepare download link
					const blob = new Blob([updatedSVGString], {
						type: "image/svg+xml;charset=utf-8",
					});
					const url = URL.createObjectURL(blob);
					downloadLink.current.href = url;
					downloadLink.current.download = "new-icon.svg";
				} else {
					// Serialize the updated SVG to a string and encode it to base64
					const serializer = new XMLSerializer();
					const updatedSVGString =
						serializer.serializeToString(svgElement);
					const base64String = btoa(updatedSVGString);
					setUpdatedSVG(`data:image/svg+xml;base64,${base64String}`);

					// Prepare download link
					const blob = new Blob([updatedSVGString], {
						type: "image/svg+xml;charset=utf-8",
					});
					const url = URL.createObjectURL(blob);
					downloadLink.current.href = url;
					downloadLink.current.download = "new-icon.svg";
				}
			};
			reader.readAsText(svgFile);
		}
	}, [svgFile, size, showSlash]);

	return (
		<Box
			component={Card}
			sx={{
				width: "300px",
				height: "120px",
				borderRadius: "6px",
				display: "flex",
			}}
		>
			<Box
				sx={{
					justifyContent: "center",
					width: "120px",
					display: "flex",
				}}
			>
				<div
					style={{
						position: "relative",
						width: `${size}px`,
						height: `${size}px`,
					}}
				>
					{updatedSVG && (
						<ReactSVG
							src={updatedSVG}
							style={{
								position: "absolute",
								top: "0",
								left: "0",
								width: "100%",
								height: "100%",
							}}
						/>
					)}
					{showSlash && updatedSVG && (
						<SvgSlash
							style={{
								position: "absolute",
								top: "0",
								left: "0",
								width: "100%",
								height: "100%",
							}}
						/>
					)}
				</div>
			</Box>

			<Box
				sx={{
					display: "flex",
					width: "100%",
					justifyContent: "center",
				}}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
					}}
				>
					<a
						ref={downloadLink}
						style={{ display: updatedSVG ? "block" : "none" }}
					>
						<Button variant="outlined">Download</Button>
					</a>
				</Box>
			</Box>
		</Box>
	);
}

function encodeSVGDatauri(svgText, type) {
	var unescaped = encodeURIComponent(svgText).replace(
		/%([0-9A-F]{2})/g,
		function (match, p1) {
			return String.fromCharCode("0x" + p1);
		}
	);

	return type === "base64" ? btoa(unescaped) : unescaped;
}

export default IconSlasher;
