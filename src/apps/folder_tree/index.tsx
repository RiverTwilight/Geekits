import React, { useState, useEffect } from "react";
import { snackbar } from "mdui";
import ClipboardJS from "clipboard";
import { Input, FileInput, Button } from "mdui-in-react";
import pathToTree from "./engine";

export default () => {
	const [fileList, setFileList] = useState([]);
	const [except, setExcept] = useState("");
	const [tree, setTree] = useState("");
	useEffect(() => {
		var clipboard = new ClipboardJS(".copy");
		clipboard.on("success", (e) => {
			snackbar({ message: "已复制" });
			e.clearSelection();
		});
		return () => clipboard && clipboard.destroy();
	}, []);
	return (
		<>
			<div className="center-with-flex">
				<FileInput
					multiple={true}
					maxWidth="200px"
					onFileUpload={(_, _file, fileList) => {
						var result = [];
						// @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
						for (var i = 0; i < fileList.length; i++) {
							// @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
							result.push(fileList[i].webkitRelativePath);
						}
						// @ts-expect-error ts-migrate(2345) FIXME: Type 'any' is not assignable to type 'never'.
						setFileList(result);
					}}
					webkitdirectory={true}
				/>
			</div>

			<Input
				value={except}
				onValueChange={setExcept}
				rows={5}
				placeholder="排除的文件夹/文件，一行一个"
			/>

			<Button
				primary
				onClick={() => {
					setTree(pathToTree(fileList, except.split("\n")));
				}}
				title="生成"
			/>

			<button
				data-clipboard-text={tree}
				className={`${
					tree === "" ? "hidden" : ""
				} copy mdui-btn mdui-btn-icon`}
			>
				<i className="mdui-icon material-icons">&#xe14d;</i>
			</button>

			<br></br>

			<div className={`${tree === "" ? "hidden" : ""} mdui-typo`}>
				<pre>{tree}</pre>
			</div>
		</>
	);
};
