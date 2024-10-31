import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";
import {
	Box,
	Button,
	List,
	ListItem,
	ListItemText,
	IconButton,
	Menu,
	MenuItem,
} from "@mui/material";
import {
	Delete as DeleteIcon,
	ArrowUpward as ArrowUpwardIcon,
	ArrowDownward as ArrowDownwardIcon,
	Merge as MergeIcon,
	Upload as UploadIcon,
	MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import FilePicker from "@/components/FilePicker";
import { saveFile } from "@/utils/fileSaver";
import FileField from "@/components/FileField";
import OutlinedCard from "@/components/OutlinedCard";

const PdfMerger: React.FC = () => {
	const [pdfFiles, setPdfFiles] = useState<File[]>([]);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [selectedFileIndex, setSelectedFileIndex] = useState<number>(-1);

	const handleFileUpload = (
		_base64: any,
		file: File | null,
		_fileList: FileList | null
	) => {
		if (file) {
			setPdfFiles((prevFiles) => [...prevFiles, file]);
		}
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

	const handleMenuOpen = (
		event: React.MouseEvent<HTMLElement>,
		index: number
	) => {
		setAnchorEl(event.currentTarget);
		setSelectedFileIndex(index);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		setSelectedFileIndex(-1);
	};

	return (
		<Box
			sx={{
				maxWidth: 1200,
				margin: "auto",
				display: "flex",
				flexDirection: { xs: "column", sm: "row" },
				gap: 2,
			}}
		>
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<FileField>
					<FilePicker
						enableDrag={true}
						fileType="application/pdf"
						handleFileUpload={handleFileUpload}
					>
						<Button
							component="span"
							variant="contained"
							startIcon={<UploadIcon />}
						>
							Add PDF
						</Button>
					</FilePicker>
				</FileField>
			</Box>
			<Box sx={{ flex: 1 }}>
				<List component={OutlinedCard}>
					{pdfFiles.map((file, index) => (
						<ListItem
							key={index}
							sx={{
								flexDirection: { xs: "column", sm: "row" },
								alignItems: { xs: "flex-start", sm: "center" },
							}}
							secondaryAction={
								<Box
									sx={{
										width: "100%",
										display: "flex",
										justifyContent: {
											xs: "flex-start",
											sm: "flex-end",
										},
										mt: { xs: 1, sm: 0 },
									}}
								>
									<Box
										sx={{
											display: {
												xs: "block",
												sm: "none",
											},
										}}
									>
										<IconButton
											edge="end"
											aria-label="more"
											onClick={(e) =>
												handleMenuOpen(e, index)
											}
										>
											<MoreVertIcon />
										</IconButton>
									</Box>

									<Box
										sx={{
											display: { xs: "none", sm: "flex" },
										}}
									>
										<IconButton
											edge="end"
											aria-label="move up"
											onClick={() =>
												handleMoveFile(index, "up")
											}
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
											disabled={
												index === pdfFiles.length - 1
											}
										>
											<ArrowDownwardIcon />
										</IconButton>
										<IconButton
											edge="end"
											aria-label="delete"
											onClick={() =>
												handleRemoveFile(index)
											}
										>
											<DeleteIcon />
										</IconButton>
									</Box>
								</Box>
							}
						>
							<ListItemText primary={file.name} />
						</ListItem>
					))}

					<Menu
						anchorEl={anchorEl}
						open={Boolean(anchorEl)}
						onClose={handleMenuClose}
					>
						<MenuItem
							onClick={() => {
								handleMoveFile(selectedFileIndex, "up");
								handleMenuClose();
							}}
							disabled={selectedFileIndex === 0}
						>
							<ArrowUpwardIcon sx={{ mr: 1 }} />
							Move Up
						</MenuItem>
						<MenuItem
							onClick={() => {
								handleMoveFile(selectedFileIndex, "down");
								handleMenuClose();
							}}
							disabled={selectedFileIndex === pdfFiles.length - 1}
						>
							<ArrowDownwardIcon sx={{ mr: 1 }} />
							Move Down
						</MenuItem>
						<MenuItem
							onClick={() => {
								handleRemoveFile(selectedFileIndex);
								handleMenuClose();
							}}
						>
							<DeleteIcon sx={{ mr: 1 }} />
							Delete
						</MenuItem>
					</Menu>
				</List>
				{pdfFiles.length > 0 && (
					<Box
						sx={{
							mt: 2,
							display: "flex",
							justifyContent: "center",
						}}
					>
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
				)}
			</Box>
		</Box>
	);
};

export default PdfMerger;
