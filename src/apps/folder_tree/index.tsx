import React, { useState, useEffect } from "react";
import ClipboardJS from "clipboard";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FileInput from "../../components/FileInput";
import pathToTree from "./engine";

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
			<FileInput
				multiple
				handleFileUpload={(_, _file, fileList) => {
					var result = [];
					// @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
					for (var i = 0; i < fileList.length; i++) {
						// @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
						result.push(fileList[i].webkitRelativePath);
					}
					// @ts-expect-error ts-migrate(2345) FIXME: Type 'any' is not assignable to type 'never'.
					setFileList(result);
				}}
				webkitdirectory
			/>
			<FormControl fullWidth>
				<Input
					value={except}
					onChange={(e) => setExcept(e.target.value)}
					multiline
					rows={5}
					placeholder="排除的文件夹/文件，一行一个"
				/>
			</FormControl>
			<Button
				onClick={() => {
					setTree(pathToTree(fileList, except.split("\n")));
				}}
				variant="contained"
				color="primary"
			>
				生成
			</Button>

			<button
				data-clipboard-text={tree}
				className={`${
					tree === "" ? "hidden" : ""
				} copy mdui-btn mdui-btn-icon`}
			>
				<i className="mdui-icon material-icons">&#xe14d;</i>
			</button>

			<br></br>

			{tree !== "" && (
				<Typography>
					<pre>{tree}</pre>
				</Typography>
			)}
		</>
	);
}
