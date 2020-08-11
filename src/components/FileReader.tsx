import * as React from 'react';
import { snackbar } from 'mdui'
import { signListener, removeListener } from '../utils/Hooks/useFileDrager'

//读取文件组件
export default class extends React.Component<IProps, IState> {
	realInput: any
	constructor(props: Readonly<IProps>) {
		super(props);
		this.state = {
			btnText: props.webkitdirectory ? '选择文件夹' : props.title ? props.title : '选择文件'
		}
	}
	componentDidMount() {
		if (this.props.webkitdirectory) {
			this.realInput.webkitdirectory = true
		}
		this.props.readbydrag && signListener(() => { }, (e: any) => this.readFile(null, e))
	}
	componentWillUnmount() {
		this.props.readbydrag && removeListener()
	}
	readFile(inputEvent?: any, dragEvent?: any) {
		if (!inputEvent && !dragEvent) return null
		const { maxSize = 99999999, onFileChange } = this.props
		const currentFileList = inputEvent ? inputEvent.target.files : dragEvent.dataTransfer.files;

		this.setState({
			btnText: currentFileList.length < 2 ? currentFileList[0].name : `${currentFileList.length}个文件`
		})

		if (this.props.webkitdirectory) {
			onFileChange && onFileChange(null, null, currentFileList);
			return
		}

		for (var i = 0; i < currentFileList.length; i++) {
			let file = currentFileList[i];
			if (file.size > maxSize) {
				snackbar({ message: '文件大小不能超过' + maxSize / 1024 / 1024 + 'MB' })
			} else {
				var freader = new FileReader();
				freader.readAsDataURL(file);
				freader.onload = fe => {
					onFileChange && fe.target && onFileChange(fe.target.result, file, currentFileList)
				}
			}
		}
	}
	handleClick() {
		this.realInput.click();
	}
	render() {
		const { webkitdirectory, fileType, onFileChange, maxWidth = '120px', ...props } = this.props;
		var icon = 'file_upload';
		if (fileType) {
			let execArr = fileType.match(/^(\S+)\/\S+$/)
			switch (execArr && execArr[1]) {
				case 'image':
					icon = 'image'; break
				case 'video':
					icon = 'videocam'; break
				default:
					icon = 'folder';
			}
		}
		return (
			<>
				<button
					style={{ maxWidth: maxWidth }}
					className="mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme"
					onClick={this.handleClick.bind(this)}>
					<i className="mdui-icon-left mdui-icon material-icons">{icon}</i>
					{this.state.btnText}
				</button>
				<input
					accept={fileType} type="file"
					style={{ display: 'none' }} ref={r => this.realInput = r}
					onChange={e => this.readFile(e)}
					{...props}
				/>
			</>
		)
	}
}

interface IProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'webkitdirectory' | 'size' | 'prefix' | 'type'> {
	/** 按钮宽度 */
	maxWidth?: string,
	maxSize?: number,
	onFileChange?(base64: any, file: File | null, fileList: FileList | null): void,
	fileType?: string,
	webkitdirectory?: boolean,
	title?: string,
	readbydrag?: boolean
}

interface IState {
	btnText: string
}
