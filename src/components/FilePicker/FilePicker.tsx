import * as React from "react";
import ReactDOM from "react-dom";
import { dataURLtoFile, saveFile } from "../../utils/fileSaver";
import { signListener, removeListener } from "./useDragListener";
import CenteredStyle from "./CenteredStyle";
import NormalStyle from "./NormalStyle";
import FolderIcon from "@mui/icons-material/Folder";
import VideocamIcon from "@mui/icons-material/Videocam";
import ImageIcon from "@mui/icons-material/Image";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

("use strict");

interface FRProps
	extends Omit<
		React.InputHTMLAttributes<HTMLInputElement>,
		"webkitdirectory" | "size" | "prefix" | "type"
	> {
	/** 按钮宽度 */
	maxWidth?: string;
	maxSize?: number;
	handleFileUpload?(
		base64?: any,
		file?: File | null,
		fileList?: FileList | null
	): void;
	fileType?: string;
	webkitdirectory?: boolean;
	template?: "normal" | "center";
	/** 按钮标题
	 * @default 'Auto detect'
	 */
	title?: string;
	/** 是否监听拖拽文件事件 */
	enableDrag?: boolean;
	children?: React.ReactElement;
}

interface FRState {
	btnText: string;
	webkitdirectory: boolean;
}

class FilePicker extends React.Component<FRProps, FRState> {
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
			var inputEle = ReactDOM.findDOMNode(
				this.refs.input
			) as HTMLInputElement;

			inputEle.setAttribute("webkitdirectory", "");
		}

		if (this.props.webkitdirectory) {
			this.setState({
				webkitdirectory: true,
			});
		}
		this.props.enableDrag &&
			signListener(
				() => {},
				(e: any) => this.handleReadFile(null, e)
			);
	}
	componentWillUnmount() {
		this.props.enableDrag && removeListener();
	}
	handleReadFile = (inputEvent?: any, dragEvent?: any) => {
		if (!inputEvent && !dragEvent) return null;

		const { maxSize = 99999999, handleFileUpload } = this.props;
		const currentFileList = inputEvent
			? inputEvent.target.files
			: dragEvent.dataTransfer.files;

		if (!currentFileList || currentFileList.length === 0) return;

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

		const file = currentFileList[0];
		if (file.size > maxSize) {
			window.snackbar({
				message: "文件大小不能超过" + maxSize / 1024 / 1024 + "MB",
			});
			return;
		}

		handleFileUpload && handleFileUpload(undefined, file, currentFileList);
	};
	render() {
		const {
			fileType,
			handleFileUpload,
			maxWidth = "120px",
			children,
			template,
			enableDrag,
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

		if (children) {
			const inputId = `gk-contained-button-file-${Math.random().toString(36).substr(2, 9)}`;
			
			return (
				<>
					<input
						accept={fileType}
						onChange={this.handleReadFile}
						type="file"
						ref="input"
						id={inputId}
						style={{ display: 'none' }}
						{...props}
					/>
					<label htmlFor={inputId}>
						{children}
					</label>
				</>
			);
		}

		return (
			<>
				{
					{
						normal: (
							<NormalStyle
								text={btnText}
								icon={icon}
								handleReadFile={this.handleReadFile}
								{...props}
							/>
						),
						center: (
							<CenteredStyle
								text={btnText}
								icon={icon}
								{...props}
							/>
						),
					}[template || "normal"]
				}
			</>
		);
	}
}

export default FilePicker;
