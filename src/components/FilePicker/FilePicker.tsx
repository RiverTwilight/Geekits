import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { dataURLtoFile, saveFile } from "../../utils/fileSaver";
import { signListener, removeListener } from "./useDragListener";
import CenteredStyle from "./CenteredStyle";
import NormalStyle from "./NormalStyle";
import FolderIcon from "@mui/icons-material/Folder";
import VideocamIcon from "@mui/icons-material/Videocam";
import ImageIcon from "@mui/icons-material/Image";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

("use strict");

interface FilePickerProps
	extends Omit<
		React.InputHTMLAttributes<HTMLInputElement>,
		"webkitdirectory" | "size" | "prefix" | "type"
	> {
	/** 按钮宽度 */
	maxWidth?: string;
	maxSize?: number;
	handleFileUpload?: (
		base64?: any,
		file?: File | null,
		fileList?: FileList | null
	) => void;
	fileType?: string;
	webkitdirectory?: boolean;
	template?: "normal" | "center";
	/** 按钮标题
	 * @default 'Select File'
	 */
	title?: string;
	/** 是否监听拖拽文件事件 */
	enableDrag?: boolean;
	children?: React.ReactElement;
}

const FilePicker: React.FC<FilePickerProps> = ({
	fileType,
	handleFileUpload,
	maxWidth = "120px",
	children,
	template = "normal",
	enableDrag,
	webkitdirectory,
	title,
	maxSize = 99999999,
	...props
}) => {
	const [btnText, setBtnText] = useState(
		webkitdirectory ? "Select Folder" : title || "Select File"
	);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (webkitdirectory && inputRef.current) {
			// Safari-compatible way to set directory picker
			try {
				inputRef.current.setAttribute("webkitdirectory", "");
				inputRef.current.setAttribute("directory", "");
				// For older Safari versions
				inputRef.current.setAttribute("mozdirectory", "");
			} catch (e) {
				console.warn("Failed to set directory attributes:", e);
			}
		}

		if (enableDrag) {
			signListener(
				() => {},
				(e: DragEvent) => handleReadFile(null, e)
			);
			return () => removeListener();
		}
	}, [webkitdirectory, enableDrag]);

	const handleReadFile = (
		inputEvent?: React.ChangeEvent<HTMLInputElement>,
		dragEvent?: DragEvent
	) => {
		if (!inputEvent && !dragEvent) return;

		const currentFileList = inputEvent
			? inputEvent.target.files
			: dragEvent?.dataTransfer?.files;

		if (!currentFileList || currentFileList.length === 0) return;

		setBtnText(
			currentFileList.length < 2
				? currentFileList[0].name
				: `${currentFileList.length} files`
		);

		if (webkitdirectory) {
			handleFileUpload?.(null, null, currentFileList);
			return;
		}

		const file = currentFileList[0];
		if (file.size > maxSize) {
			window.snackbar?.({
				message: `File size cannot exceed ${maxSize / 1024 / 1024}MB`,
			});
			return;
		}

		handleFileUpload?.(undefined, file, currentFileList);
	};

	const getIcon = () => {
		if (!fileType) return <CloudUploadIcon />;

		const fileTypeMatch = fileType.match(/^(\S+)\/\S+$/);
		const fileCategory = fileTypeMatch?.[1];

		switch (fileCategory) {
			case "image":
				return <ImageIcon />;
			case "video":
				return <VideocamIcon />;
			default:
				return <FolderIcon />;
		}
	};

	if (children) {
		const inputId = `gk-contained-button-file-${Math.random()
			.toString(36)
			.substr(2, 9)}`;

		return (
			<>
				<input
					accept={fileType}
					onChange={handleReadFile}
					type="file"
					ref={inputRef}
					id={inputId}
					style={{ display: "none" }}
					{...props}
				/>
				<label htmlFor={inputId}>{children}</label>
			</>
		);
	}

	const TemplateComponent =
		template === "center" ? CenteredStyle : NormalStyle;
	return (
		<TemplateComponent
			text={btnText}
			icon={getIcon()}
			handleReadFile={handleReadFile}
			accept={fileType}
			directory=""
			webkitdirectory=""
			{...props}
		/>
	);
};

export default FilePicker;
