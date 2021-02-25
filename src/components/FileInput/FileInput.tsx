import * as React from "react";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { dataURLtoFile, saveFile } from "../../utils/fileSaver";
import { signListener, removeListener } from "./useDragListener";

const styles = (theme: Theme) => {
	return createStyles({
		input: {
			display: "none",
		},
		container: {
			position: "absolute",
			left: "50%",
			top: "50%",
			transform: "translate(-50%,-50%)",
		},
		button: {
			background: theme.palette.primary.main,
			"&:hover, &.Mui-focusVisible": {
				backgroundColor: theme.palette.secondary.main,
			},
			width: "70px",
			height: "70px",
		},
		icon: {
			width: "40px",
			height: "40px",
			color: "white",
		},
	});
};

interface FRProps
	extends Omit<
		React.InputHTMLAttributes<HTMLInputElement>,
		"webkitdirectory" | "size" | "prefix" | "type"
	> {
	/** 按钮宽度 */
	maxWidth?: string;
	maxSize?: number;
	onFileUpload?(
		base64: any,
		file: File | null,
		fileList: FileList | null
	): void;
	fileType?: string;
	webkitdirectory?: boolean;
	/** 按钮标题
	 * @default 'Auto detect'
	 */
	title?: string;
	/** 是否监听拖拽文件事件 */
	readbydrag?: boolean;
	classes: any;
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
				(e: any) => this.readFile(null, e)
			);
	}
	componentWillUnmount() {
		this.props.readbydrag && removeListener();
	}
	readFile(inputEvent?: any, dragEvent?: any) {
		// console.log(arguments)
		if (!inputEvent && !dragEvent) return null;
		const { maxSize = 99999999, onFileUpload } = this.props;
		const currentFileList = inputEvent
			? inputEvent.target.files
			: dragEvent.dataTransfer.files;

		this.setState({
			btnText:
				currentFileList.length < 2
					? currentFileList[0].name
					: `${currentFileList.length}个文件`,
		});

		if (this.props.webkitdirectory) {
			onFileUpload && onFileUpload(null, null, currentFileList);
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
					onFileUpload &&
						fe.target &&
						onFileUpload(fe.target.result, file, currentFileList);
					// this.realInput.value = null;
				};
			}
		}
	}
	render() {
		const {
			webkitdirectory,
			fileType,
			onFileUpload,
			maxWidth = "120px",
			classes,
			children,
			...props
		} = this.props;
		var icon = "file_upload";
		if (fileType) {
			let execArr = fileType.match(/^(\S+)\/\S+$/);
			switch (execArr && execArr[1]) {
				case "image":
					icon = "image";
					break;
				case "video":
					icon = "videocam";
					break;
				default:
					icon = "folder";
			}
		}
		return (
			<div className={classes.container}>
				<input
					accept={fileType}
					id="contained-button-file"
					multiple
					onInput={this.readFile.bind(this)}
					type="file"
					className={classes.input}
				/>
				<label htmlFor="contained-button-file">
					<IconButton
						className={classes.button}
						aria-label="upload picture"
						component="span"
					>
						<PhotoCamera className={classes.icon} />
					</IconButton>
				</label>
				{children}
			</div>
			// <button
			// 	style={{ maxWidth: maxWidth }}
			// 	className="mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme"
			// 	onClick={this.handleClick.bind(this)}
			// >
			// 	<i className="mdui-icon-left mdui-icon material-icons">
			// 		{icon}
			// 	</i>
			// 	{this.state.btnText}
			// </button>
			// <input
			// 	accept={fileType}
			// 	type="file"
			// 	style={{ display: "none" }}
			// 	onInput={this.readFile.bind(this)}
			// 	ref={(r) => (this.realInput = r)}
			// 	{...props}
			// />
		);
	}
}

export default withStyles(styles)(FileInput);
