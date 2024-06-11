import ClipboardJS from "clipboard";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import OutlinedCard from "../../components/OutlinedCard";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import useFileDrager from "../../components/FilePicker/useDragListener";
import React, { useState, useEffect } from "react";

const Result = ({ res }) => {
	if (res === "") return null;
	return (
		<OutlinedCard padding={1}>
			<code>{res}</code>
		</OutlinedCard>
	);
};

const Html2Jsx = () => {
	const [text, setText] =
		useState(`<div class="container" style="color: #66ccff; background-color: #f0f0f0" onclick="handleClick()">
    <label for="inputField">Name:</label>
    <input type="text" id="inputField" class="input-field" autofocus>
</div>`);
	const [res, setRes] = useState("");

	useEffect(() => {
		const clipboard = new ClipboardJS("#becopy");
		clipboard.on("success", (e) => {
			window.snackbar({ message: "已复制结果" });
			e.clearSelection();
		});
	}, []);

	useFileDrager((fileContent) => {
		setText(fileContent);
	});

	const styleStringToObject = (styleString) => {
		return styleString.split(";").reduce((styleObject, styleProperty) => {
			if (styleProperty.trim()) {
				let [property, value] = styleProperty.split(":");
				property = property
					.trim()
					.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
				value = value.trim();
				styleObject[property] = value;
			}
			return styleObject;
		}, {});
	};

	const html2jsx = () => {
		try {
			const result = text
				.replace(/\bclass[\=]/g, "className=")
				.replace(/\bfor\b/g, "htmlFor")
				.replace(/\bstyle="(.+?)"/g, (match, inlineStyle) => {
					const jsxStyle = styleStringToObject(inlineStyle);
					return `style={${JSON.stringify(jsxStyle)}}`;
				})
				.replace(/\bautofocus\b/g, "autoFocus")
				.replace(/\bcontenteditable\b/g, "contentEditable")
				.replace(/\bcontextmenu\b/g, "contextMenu")
				.replace(/\btabindex\b/g, "tabIndex")
				.replace(/\bcolspan\b/g, "colSpan")
				.replace(/\browspan\b/g, "rowSpan")
				.replace(/\bframeborder\b/g, "frameBorder")
				.replace(/\bmaxlength\b/g, "maxLength")
				.replace(/\bminlength\b/g, "minLength")
				.replace(/\bon([a-z]+)="(.+?)"/g, (match, event, handler) => {
					return `on${
						event.charAt(0).toUpperCase() + event.slice(1)
					}={${handler}}`;
				});

			setRes(result);
		} catch (err) {
			window.snackbar({ message: "转换出错" });
		}
	};

	const handleChange = (e) => {
		setText(e.target.value);
	};

	return (
		<Grid container spacing={2}>
			<Grid item md={6} xs={12}>
				<FormControl fullWidth>
					<TextField
						autoComplete="off"
						id="search"
						value={text}
						variant="outlined"
						onChange={handleChange}
						rows={10}
						multiline
						label="输入内容或拖入txt文件"
					/>
				</FormControl>
				<div className="clearfix"></div>
				<br />
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<Button
							fullWidth
							onClick={html2jsx}
							variant="contained"
						>
							转换为jsx
						</Button>
					</Grid>
					<Grid item xs={6}>
						<Button
							disabled={res === ""}
							fullWidth
							variant="outlined"
							id="becopy"
							data-clipboard-text={res}
						>
							复制结果
						</Button>
					</Grid>
				</Grid>
			</Grid>
			<Grid item md={6} xs={12}>
				<Result res={res} />
			</Grid>
		</Grid>
	);
};

export default Html2Jsx;
