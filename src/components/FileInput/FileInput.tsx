import * as React from "react";
import { dataURLtoFile, saveFile } from "../../utils/fileSaver";
import { signListener, removeListener } from "./useDragListener";
import CenteredStyle from "./CenteredStyle";
import NormalStyle from "./NormalStyle";

import FolderIcon from "@material-ui/icons/Folder";
import VideocamIcon from "@material-ui/icons/Videocam";
import ImageIcon from "@material-ui/icons/Image";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

interface FRProps
	extends Omit<
		React.InputHTMLAttributes<HTMLInputElement>,
		"webkitdirectory" | "size" | "prefix" | "type"
	> {
	/** 按钮宽度 */
	maxWidth?: string;
	maxSize?: number;
	handleFileUpload?(
		base64: any,
		file: File | null,
		fileList: FileList | null
	): void;
	fileType?: string;
	webkitdirectory?: boolean;
	template?: "normal" | "center";
	/** 按钮标题
	 * @default 'Auto detect'
	 */
	title?: string;
	/** 是否监听拖拽文件事件 */
	readbydrag?: boolean;
	children?: React.ReactNode;
}

interface FRState {
	btnText: string;
	webkitdirectory: boolean;
}

class FileInput extends React.Component<FRProps, FRState> {
	constructor(props: FRProps | Readonly<FRProps>) {
		super(props);
		this.state = {
			btnText: props.webkitdirectory
				? "选择文件夹"
				: props.title
				? props.title
				: "选择文件",
			webkitdirectory: false,
		};
	}
	componentDidMount() {
		if (this.props.webkitdirectory) {
			this.setState({
				webkitdirectory: true,
			});
		}
		this.props.readbydrag &&
			signListener(
				() => {},
				(e: any) => this.handleReadFile(null, e)
			);
	}
	componentWillUnmount() {
		this.props.readbydrag && removeListener();
	}
	handleReadFile(inputEvent?: any, dragEvent?: any) {
		if (!inputEvent && !dragEvent) return null;
		const { maxSize = 99999999, handleFileUpload } = this.props;
		const currentFileList = inputEvent
			? inputEvent.target.files
			: dragEvent.dataTransfer.files;
debugger
		this.setState({
			btnText:
				currentFileList.length < 2
					? currentFileList[0].name
					: `${currentFileList.length}个文件`,
		});

		if (this.props.webkitdirectory) {
			handleFileUpload && handleFileUpload(null, null, currentFileList);
			return;
		}

		for (var i = 0; i < currentFileList.length; i++) {
			let file = currentFileList[i];
			if (file.size > maxSize) {
				window.snackbar({
					message: "文件大小不能超过" + maxSize / 1024 / 1024 + "MB",
				});
			} else {
				var freader = new FileReader();
				freader.readAsDataURL(file);
				freader.onload = (fe) => {
					handleFileUpload &&
						fe.target &&
						handleFileUpload(fe.target.result, file, currentFileList);
					// this.realInput.value = null;
				};
			}
		}
	}
	render() {
		const {
			webkitdirectory,
			fileType,
			handleFileUpload,
			maxWidth = "120px",
			children,
			template,
			...props
		} = this.props;
		const { btnText } = this.state;
		var icon = <CloudUploadIcon />;
		if (fileType) {
			let execArr = fileType.match(/^(\S+)\/\S+$/);
			switch (execArr && execArr[1]) {
				case "image":
					icon = <ImageIcon />;
					break;
				case "video":
					icon = <VideocamIcon />;
					break;
				default:
					icon = <FolderIcon />;
			}
		}
		return (
			<>
				{
					{
						normal: (
							<NormalStyle
								text={btnText}
								icon={icon}
								{...this.props}
							/>
						),
						center: (
							<CenteredStyle
								text={btnText}
								icon={icon}
								{...this.props}
							/>
						),
					}[template || "normal"]
				}
			</>
		);
	}
}

export default FileInput;
