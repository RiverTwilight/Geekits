import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";
import {
	Box,
	Button,
	List,
	ListItem,
	ListItemText,
	IconButton,
	Typography,
	Paper,
} from "@mui/material";
import {
	Delete as DeleteIcon,
	ArrowUpward as ArrowUpwardIcon,
	ArrowDownward as ArrowDownwardIcon,
	Merge as MergeIcon,
	Upload as UploadIcon,
} from "@mui/icons-material";
import FilePicker from "@/components/FilePicker";
import { saveFile } from "@/utils/fileSaver";

const PdfMerger: React.FC = () => {
	const [pdfFiles, setPdfFiles] = useState<File[]>([]);

	const handleFileUpload = (file: File) => {
		setPdfFiles((prevFiles) => [...prevFiles, file]);
	};

	const handleRemoveFile = (index: number) => {
		setPdfFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
	};

	const handleMoveFile = (index: number, direction: "up" | "down") => {
		setPdfFiles((prevFiles) => {
			const newFiles = [...prevFiles];
			const newIndex = direction === "up" ? index - 1 : index + 1;
			[newFiles[index], newFiles[newIndex]] = [
				newFiles[newIndex],
				newFiles[index],
			];
			return newFiles;
		});
	};

	const handleMergePDFs = async () => {
		const mergedPdf = await PDFDocument.create();

		for (const file of pdfFiles) {
			const pdfBytes = await file.arrayBuffer();
			const pdf = await PDFDocument.load(pdfBytes);
			const copiedPages = await mergedPdf.copyPages(
				pdf,
				pdf.getPageIndices()
			);
			copiedPages.forEach((page) => mergedPdf.addPage(page));
		}

		const pdfBytes = await mergedPdf.save();
		const blob = new Blob([pdfBytes], { type: "application/pdf" });
		saveFile({ file: blob, filename: "merged.pdf", type: "pdf" });
	};

	return (
		<Box sx={{ maxWidth: 600, margin: "auto", p: 3 }}>
			<Typography variant="h4" gutterBottom>
				PDF Merger
			</Typography>
			<Paper elevation={3} sx={{ p: 2, mb: 2 }}>
				<FilePicker
					enableDrag={true}
					fileType="application/pdf"
					handleFileUpload={handleFileUpload}
					customButton={
						<Button variant="contained" startIcon={<UploadIcon />}>
							Add PDF
						</Button>
					}
				/>
			</Paper>
			<List>
				{pdfFiles.map((file, index) => (
					<ListItem
						key={index}
						secondaryAction={
							<Box>
								<IconButton
									edge="end"
									aria-label="move up"
									onClick={() => handleMoveFile(index, "up")}
									disabled={index === 0}
								>
									<ArrowUpwardIcon />
								</IconButton>
								<IconButton
									edge="end"
									aria-label="move down"
									onClick={() =>
										handleMoveFile(index, "down")
									}
									disabled={index === pdfFiles.length - 1}
								>
									<ArrowDownwardIcon />
								</IconButton>
								<IconButton
									edge="end"
									aria-label="delete"
									onClick={() => handleRemoveFile(index)}
								>
									<DeleteIcon />
								</IconButton>
							</Box>
						}
					>
						<ListItemText primary={file.name} />
					</ListItem>
				))}
			</List>
			<Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
				<Button
					variant="contained"
					color="primary"
					startIcon={<MergeIcon />}
					onClick={handleMergePDFs}
					disabled={pdfFiles.length < 2}
				>
					Merge PDFs
				</Button>
			</Box>
		</Box>
	);
};

export default PdfMerger;
