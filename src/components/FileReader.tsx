import React from 'react';
import { snackbar } from 'mdui'

//读取文件组件
export default class extends React.Component<IProps, IState> {
	realInput: any
	constructor(props: Readonly<IProps>) {
		super(props);
		this.state = {
			file: this.props.text || '选择文件'
		}
	}
	readFile(e: React.ChangeEvent<HTMLInputElement>) {
		const { maxSize = 99999999, onFileChange } = this.props
		if(!e.target.files)return null
		var fileList = e.target.files;
		console.log(e.target.attributes.getNamedItem('webkitdirectory'))
		if(e.target.attributes.getNamedItem('webkitdirectory')){
			onFileChange && onFileChange(null, null, fileList);
			return
		}
		for (var i = 0; i < fileList.length; i++) {
			let file = e.target.files[i];
			if (file.size > maxSize) {
				snackbar({ message: '文件大小不能超过' + maxSize / 1024 / 1024 + 'MB' })
			} else {
				fileList.length >=2 && this.setState({ file: file.name })
				var freader = new FileReader();
				freader.readAsDataURL(file);
				freader.onload = fe => {
					onFileChange && fe.target && onFileChange(fe.target.result, file, fileList)
				}
			}
		}
	}
	handleClick() {
		this.realInput.click();
	}
	render() {
		const { fileType, onFileChange, maxWidth = '120px', ...props } = this.props;
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
					style={{ maxWidth: maxWidth}}
					className="mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme"
					onClick={this.handleClick.bind(this)}>
					<i className="mdui-icon-left mdui-icon material-icons">{icon}</i>
					{this.state.file}
				</button>
				<input
					accept={this.props.fileType} type="file"
					style={{ display: 'none' }} ref={r => this.realInput = r}
					onChange={e => this.readFile(e)}
					{...props}
				/>
			</>
		)
	}
}

interface IProps {
	/** 按钮宽度 */
	maxWidth?: '120px',
	maxSize?: number,
	onFileChange?(base64: string | ArrayBuffer | null, file: File |　null, fileList: FileList | null): void,
	fileType?: string,
	/* 显示在按钮上的文本 */
	text: string
}

interface IState {
	file: string
}
