import React, { useState, useEffect } from "react";
import ClipboardJS from "clipboard";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FilePicker from "@/components/FilePicker";
import pathToTree from "./engine";
import OutlinedCard from "../../components/OutlinedCard";
import { ContentCopy } from "@mui/icons-material";

export default function FolderTree() {
	const [fileList, setFileList] = useState([]);
	const [except, setExcept] = useState("");
	const [tree, setTree] = useState("");

	useEffect(() => {
		var clipboard = new ClipboardJS(".copy");
		clipboard.on("success", (e) => {
			window.snackbar({ message: "已复制" });
			e.clearSelection();
		});
		return () => clipboard && clipboard.destroy();
	}, []);

	return (
		<>
			<OutlinedCard padding={2}>
				<Typography variant="h5" gutterBottom>
					1. 选择一个文件夹
				</Typography>
				<FilePicker
					multiple
					webkitdirectory
					handleFileUpload={(_, _file, fileList) => {
						var result = [];
						for (var i = 0; i < fileList.length; i++) {
							result.push(fileList[i].webkitRelativePath);
						}
						setFileList(result);
					}}
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
					onClick={() => {
						setTree(pathToTree(fileList, except.split("\n")));
					}}
					variant="contained"
					color="primary"
					disabled={!!!fileList.length}
				>
					生成
				</Button>

				{tree !== "" && (
					<IconButton data-clipboard-text={tree} className={`copy`}>
						<ContentCopy />
					</IconButton>
				)}

				<br></br>

				{tree !== "" && (
					<Typography>
						<pre>{tree}</pre>
					</Typography>
				)}
			</OutlinedCard>
		</>
	);
}
