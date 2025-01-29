import React, { useState, useEffect } from "react";
import ClipboardJS from "clipboard";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FilePicker from "@/components/FilePicker";
import pathToTree from "./engine";
import OutlinedCard from "@/components/OutlinedCard";
import { ContentCopy } from "@mui/icons-material";

type TreeDataType = {
	[key: string]: TreeDataType | string;
};

export default function FolderTree() {
	const [fileList, setFileList] = useState<string[]>([]);
	const [except, setExcept] = useState<string>("");
	const [treeOutput, setTreeOutput] = useState<string>("");

	useEffect(() => {
		const clipboard = new ClipboardJS(".copy");
		clipboard.on("success", (e) => {
			window.snackbar({ message: "已复制" });
			e.clearSelection();
		});
		return () => clipboard && clipboard.destroy();
	}, []);

	const handleGenerateTree = () => {
		const treeData = pathToTree(fileList, except.split("\n"));
		const formattedTree = JSON.stringify(treeData, null, 2);
		setTreeOutput(formattedTree);
	};

	const handleFileUpload = (_: any, _file: File | null, fileList: FileList | null) => {
		if (!fileList) return;
		const result = Array.from(fileList).map((file) => {
			// Handle both Safari and Chrome path formats
			return file.webkitRelativePath || file.name;
		});
		setFileList(result);
	};

	return (
		<>
			<OutlinedCard padding={2}>
				<Typography variant="h5" gutterBottom>
					1. 选择一个文件夹
				</Typography>
				<FilePicker
					multiple
					webkitdirectory
					handleFileUpload={handleFileUpload}
				>
					<Button component="label">选择文件夹</Button>
				</FilePicker>
			</OutlinedCard>
			<br />
			<OutlinedCard padding={2}>
				<Typography variant="h5" gutterBottom>
					2. 设置要排除的路径（可选）
				</Typography>
				<FormControl fullWidth>
					<Input
						value={except}
						onChange={(e) => setExcept(e.target.value)}
						multiline
						rows={5}
						placeholder="排除的文件夹/文件，一行一个"
					/>
				</FormControl>
			</OutlinedCard>
			<br />
			<OutlinedCard padding={2}>
				<Typography variant="h5" gutterBottom>
					3. 生成文件树
				</Typography>
				<Button
					onClick={handleGenerateTree}
					variant="contained"
					color="primary"
					disabled={fileList.length === 0}
				>
					生成
				</Button>

				{treeOutput && (
					<IconButton
						data-clipboard-text={treeOutput}
						className="copy"
					>
						<ContentCopy />
					</IconButton>
				)}

				<br />

				{treeOutput && (
					<Typography component="div">
						<pre>{treeOutput}</pre>
					</Typography>
				)}
			</OutlinedCard>
		</>
	);
}
